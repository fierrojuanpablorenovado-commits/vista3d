"use client";

import { useEffect, useRef, useState } from "react";
import * as pc from "playcanvas";
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs";

export type SplatViewerProps = {
  src: string;
  className?: string;
  clearColor?: [number, number, number];
  /** Rotation (euler degrees) applied to the splat. Many real-world captures need a 180° Z flip. */
  splatRotation?: [number, number, number];
  /** Optional fixed initial camera position. When omitted, camera auto-frames the splat AABB. */
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
};

const DEFAULT_CLEAR: [number, number, number] = [0.04, 0.04, 0.04];

export default function SplatViewer({
  src,
  className,
  clearColor: clearColorProp,
  splatRotation,
  cameraStart,
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

    (async () => {
      try {
        const device = await pc.createGraphicsDevice(canvas, {
          deviceTypes: [pc.DEVICETYPE_WEBGL2],
          antialias: false,
        });
        if (cancelled) {
          device.destroy();
          return;
        }
        device.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

        const createOptions = new pc.AppOptions();
        createOptions.graphicsDevice = device;
        createOptions.mouse = new pc.Mouse(canvas);
        createOptions.touch = new pc.TouchDevice(canvas);
        createOptions.keyboard = new pc.Keyboard(window);
        createOptions.componentSystems = [
          pc.CameraComponentSystem,
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
        if (typeof window !== "undefined") {
          (window as unknown as { __vista3dApp: pc.AppBase }).__vista3dApp = app;
        }

        // ---- Camera ----
        const cameraEntity = new pc.Entity("camera");
        cameraEntity.addComponent("camera", {
          clearColor: new pc.Color(clearColor[0], clearColor[1], clearColor[2]),
          fov: 55,
          nearClip: 0.01,
          farClip: 100000,
          toneMapping: pc.TONEMAP_ACES,
        });
        cameraEntity.setLocalPosition(3, 2, 4);
        cameraEntity.lookAt(0, 0, 0);
        app.root.addChild(cameraEntity);

        // ---- Camera controls (orbit + fly) ----
        cameraEntity.addComponent("script");
        const scriptComp = cameraEntity.script as pc.ScriptComponent;
        const ctrl = scriptComp.create(CameraControls) as unknown as {
          enableFly: boolean;
          enableOrbit: boolean;
          enablePan: boolean;
          focusDamping: number;
          focusPoint: pc.Vec3;
        } | null;
        if (ctrl) {
          ctrl.enableFly = false;
          ctrl.enableOrbit = true;
          ctrl.enablePan = true;
          ctrl.focusDamping = 0.96;
        }

        // ---- Load splat ----
        const asset = new pc.Asset("splat", "gsplat", { url: src });
        asset.on("progress", (received: number, total: number) => {
          if (total > 0) setProgress(received / total);
        });
        asset.on("error", (err: string) => setErrorMsg(err));
        app.assets.add(asset);

        asset.ready(() => {
          if (!app || cancelled) return;
          const splat = new pc.Entity("splat");
          splat.addComponent("gsplat", { asset });
          if (splatRotation) {
            splat.setLocalEulerAngles(splatRotation[0], splatRotation[1], splatRotation[2]);
          }
          app.root.addChild(splat);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const gsplatComp = splat.gsplat;
              const instance = gsplatComp?.instance;
              const aabb = instance?.meshInstance?.aabb;
              if (cameraStart) {
                // Explicit camera position (good for known scenes)
                cameraEntity.setPosition(
                  cameraStart.position[0],
                  cameraStart.position[1],
                  cameraStart.position[2]
                );
                cameraEntity.lookAt(
                  cameraStart.lookAt[0],
                  cameraStart.lookAt[1],
                  cameraStart.lookAt[2]
                );
                const cam = cameraEntity.camera;
                if (cam && aabb) {
                  const radius = aabb.halfExtents.length();
                  cam.nearClip = Math.max(radius * 0.001, 0.01);
                  cam.farClip = Math.max(radius * 20, 100);
                }
                if (ctrl) {
                  ctrl.focusPoint = new pc.Vec3(
                    cameraStart.lookAt[0],
                    cameraStart.lookAt[1],
                    cameraStart.lookAt[2]
                  );
                }
              } else if (aabb) {
                const center = aabb.center;
                const radius = aabb.halfExtents.length();
                const dist = Math.max(radius * 1.4, 3);
                cameraEntity.setPosition(
                  center.x + dist * 0.6,
                  center.y + dist * 0.15,
                  center.z + dist * 0.6
                );
                cameraEntity.lookAt(center);
                const cam = cameraEntity.camera;
                if (cam) {
                  cam.nearClip = Math.max(radius * 0.001, 0.01);
                  cam.farClip = Math.max(radius * 20, 100);
                }
                if (ctrl) {
                  ctrl.focusPoint = center.clone();
                }
              }
              setLoaded(true);
            });
          });
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

        app.start();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(msg);
      }
    })();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      if (app) {
        try {
          app.destroy();
        } catch {
          /* ignore */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, splatRotationStr, cameraStartStr]);

  return (
    <div
      ref={containerRef}
      className={"relative w-full h-full bg-black " + (className ?? "")}
    >
      <canvas
        ref={canvasRef}
        className="pc-app"
        style={{ width: "100%", height: "100%", display: "block" }}
      />

      {!loaded && !errorMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 pointer-events-none">
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-orange-400 transition-all duration-200"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="mt-4 text-white/70 text-sm font-mono tabular-nums">
            Cargando splat… {Math.round(progress * 100)}%
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-6">
          <div className="max-w-md text-center">
            <p className="text-red-400 text-sm mb-2">Error al cargar el splat</p>
            <p className="text-white/60 text-xs font-mono break-all">{errorMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
}
