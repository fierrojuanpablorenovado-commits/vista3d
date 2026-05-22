"use client";

import { useEffect, useRef, useState } from "react";
import * as pc from "playcanvas";
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs";

export type SplatViewerProps = {
  src: string;
  className?: string;
  clearColor?: [number, number, number];
  splatRotation?: [number, number, number];
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
  onReady?: () => void;
};

const DEFAULT_CLEAR: [number, number, number] = [0.04, 0.04, 0.04];

type AssetKind = "gsplat" | "container";
const detectKind = (src: string): AssetKind => {
  const lower = src.toLowerCase().split(/[?#]/)[0];
  if (lower.endsWith(".glb") || lower.endsWith(".gltf")) return "container";
  return "gsplat";
};

export default function SplatViewer({
  src,
  className,
  clearColor: clearColorProp,
  splatRotation,
  cameraStart,
  onReady,
}: SplatViewerProps) {
  const clearColor = clearColorProp ?? DEFAULT_CLEAR;
  const splatRotationStr = splatRotation ? splatRotation.join(",") : "";
  const cameraStartStr = cameraStart
    ? `${cameraStart.position.join(",")}|${cameraStart.lookAt.join(",")}`
    : "";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let app: pc.AppBase | null = null;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let sortTimer: ReturnType<typeof setTimeout> | null = null;
    const kind = detectKind(src);

    (async () => {
      try {
        const device = await pc.createGraphicsDevice(canvas,
          // alpha:true → transparent backbuffer when autoRender=false.
          // Transparent canvas ≠ Direct Composition hardware overlay,
          // so the photo cover in the parent stays visible via CSS z-index.
          Object.assign(
            { deviceTypes: [pc.DEVICETYPE_WEBGL2], antialias: false },
            { alpha: true }
          ) as Parameters<typeof pc.createGraphicsDevice>[1]
        );
        if (cancelled) { device.destroy(); return; }
        device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

        const createOptions = new pc.AppOptions();
        createOptions.graphicsDevice = device;
        createOptions.mouse = new pc.Mouse(canvas);
        createOptions.touch = new pc.TouchDevice(canvas);
        createOptions.keyboard = new pc.Keyboard(window);
        createOptions.componentSystems = [
          pc.CameraComponentSystem,
          pc.LightComponentSystem,
          pc.RenderComponentSystem,
          pc.ScriptComponentSystem,
          pc.GSplatComponentSystem,
        ];
        createOptions.resourceHandlers = [
          pc.TextureHandler,
          pc.JsonHandler,
          pc.BinaryHandler,
          pc.GSplatHandler,
          pc.ContainerHandler,
          pc.ScriptHandler,
        ];

        app = new pc.AppBase(canvas);
        app.init(createOptions);
        app.setCanvasFillMode(pc.FILLMODE_NONE);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        // ---- Camera (default position; re-framed after AABB is ready) ----
        const cameraEntity = new pc.Entity("camera");
        cameraEntity.addComponent("camera", {
          clearColor: new pc.Color(clearColor[0], clearColor[1], clearColor[2]),
          fov: 55,
          nearClip: 0.01,
          farClip: 100000,
          toneMapping: pc.TONEMAP_ACES,
        });
        cameraEntity.setLocalPosition(0, 0, 30); // far enough to not be inside any scene
        cameraEntity.lookAt(0, 0, 0);
        app.root.addChild(cameraEntity);

        if (kind === "container") {
          const kl = new pc.Entity("key-light");
          kl.addComponent("light", { type: "directional", color: new pc.Color(1,1,1), intensity: 1.4, castShadows: true, shadowBias: 0.2, normalOffsetBias: 0.05, shadowDistance: 50, shadowResolution: 2048 });
          kl.setLocalEulerAngles(45, 30, 0);
          app.root.addChild(kl);
          const fl = new pc.Entity("fill-light");
          fl.addComponent("light", { type: "directional", color: new pc.Color(0.9,0.95,1), intensity: 0.45, castShadows: false });
          fl.setLocalEulerAngles(-30, -120, 0);
          app.root.addChild(fl);
          app.scene.ambientLight = new pc.Color(0.2, 0.22, 0.28);
        }

        // ---- Camera controls ----
        cameraEntity.addComponent("script");
        const scriptComp = cameraEntity.script as pc.ScriptComponent;
        const ctrl = scriptComp.create(CameraControls) as unknown as {
          enableFly: boolean; enableOrbit: boolean; enablePan: boolean;
          focusDamping: number; focusPoint: pc.Vec3;
        } | null;
        if (ctrl) {
          ctrl.enableFly = false;
          ctrl.enableOrbit = true;
          ctrl.enablePan = true;
          ctrl.focusDamping = 0.96;
        }

        // ---- Load asset ----
        const asset = new pc.Asset(kind === "container" ? "model" : "splat", kind, { url: src });
        asset.on("progress", (received: number, total: number) => {
          if (total > 0) setProgress(received / total);
        });
        asset.on("error", (err: string) => setErrorMsg(err));
        app.assets.add(asset);

        asset.ready(() => {
          if (!app || cancelled) return;

          const node = new pc.Entity(kind === "container" ? "model" : "splat");
          if (kind === "container") {
            const container = asset.resource as pc.ContainerResource;
            node.addChild(container.instantiateRenderEntity());
          } else {
            node.addComponent("gsplat", { asset });
          }
          if (splatRotation) {
            node.setLocalEulerAngles(splatRotation[0], splatRotation[1], splatRotation[2]);
          }
          app.root.addChild(node);

          // ── KEY FIX ─────────────────────────────────────────────────────
          // Step 1: Disable render BEFORE start() so zero frames are drawn
          //         while we wait for AABB + sort convergence.
          // Step 2: Start the app — update loop runs (sort worker fires),
          //         but no visual output (canvas stays transparent → no overlay).
          // Step 3: Poll until the GSplat AABB is computed (happens after the
          //         first update tick, typically ~50ms).
          // Step 4: Frame camera using the real AABB.
          // Step 5: Wait 2 s from AABB ready so sort has fully converged.
          // Step 6: Enable render → first frame = clean sorted 3D → reveal.
          // ────────────────────────────────────────────────────────────────
          app!.autoRender = false;
          app!.start();

          let pollTicks = 0;
          pollInterval = setInterval(() => {
            if (cancelled || !app) { clearInterval(pollInterval!); return; }
            pollTicks++;

            let aabb: pc.BoundingBox | null = null;
            if (kind === "gsplat") {
              const gsplatComp = (node as unknown as {
                gsplat?: { instance?: { meshInstance?: { aabb: pc.BoundingBox } } };
              }).gsplat;
              const candidate = gsplatComp?.instance?.meshInstance?.aabb ?? null;
              if (candidate && candidate.halfExtents.length() > 0.001) aabb = candidate;
            } else {
              const renders = node.findComponents("render") as pc.RenderComponent[];
              renders.forEach((r) => {
                r.meshInstances?.forEach((mi) => {
                  if (!aabb) aabb = mi.aabb.clone();
                  else aabb!.add(mi.aabb);
                });
              });
            }

            // Give up polling after 2 s; use safe defaults if AABB never arrives
            const timedOut = pollTicks > 40;
            if (!aabb && !timedOut) return; // not ready yet

            clearInterval(pollInterval!);
            pollInterval = null;

            // ---- Frame camera ----
            if (cameraStart) {
              cameraEntity.setPosition(cameraStart.position[0], cameraStart.position[1], cameraStart.position[2]);
              cameraEntity.lookAt(cameraStart.lookAt[0], cameraStart.lookAt[1], cameraStart.lookAt[2]);
              if (ctrl) ctrl.focusPoint = new pc.Vec3(...cameraStart.lookAt);
            } else if (aabb) {
              const a = aabb as pc.BoundingBox;
              const center = a.center;
              const radius = a.halfExtents.length();
              const dist = Math.max(radius * 1.8, 1);
              cameraEntity.setPosition(center.x + dist * 0.6, center.y + dist * 0.35, center.z + dist * 0.6);
              cameraEntity.lookAt(center);
              const cam = cameraEntity.camera;
              if (cam) {
                cam.nearClip = Math.max(radius * 0.001, 0.001);
                cam.farClip = Math.max(radius * 60, 100);
              }
              if (ctrl) ctrl.focusPoint = center.clone();
            }

            // ---- Wait for sort to fully converge, then reveal ----
            sortTimer = setTimeout(() => {
              if (cancelled || !app) return;
              app!.autoRender = true;
              requestAnimationFrame(() => {
                if (!cancelled) {
                  setLoaded(true);
                  onReady?.();
                }
              });
            }, 2000); // 2 s after AABB ready = sort fully settled
          }, 50); // poll every 50 ms
        });

        app.assets.load(asset);

        // ---- Responsive canvas ----
        const resize = () => {
          const rect = container.getBoundingClientRect();
          canvas.style.width = rect.width + "px";
          canvas.style.height = rect.height + "px";
          app?.resizeCanvas();
        };
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        window.addEventListener("resize", resize);

      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(msg);
      }
    })();

    return () => {
      cancelled = true;
      if (pollInterval) clearInterval(pollInterval);
      if (sortTimer) clearTimeout(sortTimer);
      resizeObserver?.disconnect();
      if (app) { try { app.destroy(); } catch { /* ignore */ } }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, splatRotationStr, cameraStartStr]);

  return (
    <div ref={containerRef} className={"relative w-full h-full " + (className ?? "")}>
      <canvas
        ref={canvasRef}
        className="pc-app"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {!loaded && !errorMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black pointer-events-none">
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-orange-400 transition-all duration-200"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="mt-4 text-white/70 text-sm font-mono tabular-nums">
            Cargando… {Math.round(progress * 100)}%
          </p>
        </div>
      )}
      {errorMsg && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-6">
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
