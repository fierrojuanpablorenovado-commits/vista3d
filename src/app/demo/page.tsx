"use client";

import { useState } from "react";
import Link from "next/link";
import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";

type SplatOption = {
  id: string;
  label: string;
  short: string;
  category: string;
  src: string;
  size: string;
  splatCount: string;
  description: string;
  features: string[];
  creator: string;
  creatorLink?: string;
  license: string;
  sourceUrl: string;
  // Optional render tweaks per splat
  splatRotation?: [number, number, number];
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
};

const SPLATS: SplatOption[] = [
  {
    id: "provence",
    label: "Garden House · Provence",
    short: "Casa con alberca",
    category: "Inmobiliaria · Residencial de lujo",
    src: "https://d28zzqy0iyovbz.cloudfront.net/ec388ae7/v1/meta.json",
    size: "143 MB",
    splatCount: "13.9M splats",
    description:
      "Propiedad provençal de 2 plantas con alberca, olivar, viñedo y jardín de 5,000 m². Captura completa del exterior con recorrido del perímetro.",
    features: ["Exterior 360°", "Alberca + jardines", "5,000 m² capturados", "Iluminación natural"],
    creator: "Aurélien Camart (splatmotion3dgs)",
    creatorLink: "https://www.linkedin.com/in/aurélien-camart-97ab9929/",
    license: "CC BY 4.0",
    sourceUrl: "https://superspl.at/scene/ec388ae7",
  },
  {
    id: "paramount",
    label: "2508 Paramount House",
    short: "Interior residencial",
    category: "Inmobiliaria · Walkthrough interior",
    src: "https://d28zzqy0iyovbz.cloudfront.net/91c1e47e/v1/meta.json",
    size: "94 MB",
    splatCount: "Multi-room",
    description:
      "Interior completo de una casa residencial — todos los ambientes capturados y unificados en un solo splat navegable, con detección de colisión para walkthrough.",
    features: ["Interior multi-cuarto", "Walkthrough completo", "Detalle alta resolución", "Captura unificada"],
    creator: "cameroncone",
    license: "Ver en SuperSplat",
    sourceUrl: "https://superspl.at/scene/91c1e47e",
  },
  {
    id: "sunnyvale",
    label: "Calle Sunnyvale",
    short: "Captura urbana",
    category: "Demo técnico · Exterior urbano",
    src: "https://code.playcanvas.com/examples_data/example_sunnyvale/sunnyvale.sog",
    size: "58 MB",
    splatCount: "—",
    description:
      "Captura volumétrica de una calle residencial real. Demuestra cómo el splatting maneja palmeras, mobiliario urbano y sombras dinámicas.",
    features: ["Exterior urbano", "Vegetación detallada", "Sombras realistas", "Demo PlayCanvas"],
    creator: "PlayCanvas",
    license: "Demo público",
    sourceUrl: "https://playcanvas.com",
    splatRotation: [0, 0, 180],
    cameraStart: { position: [0, 2.9, 0], lookAt: [0, 2.5, -5] },
  },
];

export default function DemoPage() {
  const [activeId, setActiveId] = useState<string>("provence");
  const active = SPLATS.find((s) => s.id === activeId) ?? SPLATS[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 relative">
          {/* Viewer — key forces a fresh viewer instance per splat */}
          <SplatViewerClient
            key={active.id}
            src={active.src}
            splatRotation={active.splatRotation}
            cameraStart={active.cameraStart}
          />

          {/* Splat selector (top-center) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex gap-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-md p-1">
              {SPLATS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={
                    "px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap " +
                    (s.id === activeId
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white hover:bg-white/5")
                  }
                >
                  {s.short}
                </button>
              ))}
            </div>
          </div>

          {/* Info card (top-left) */}
          <div className="absolute top-4 left-4 z-10 max-w-xs bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-4 text-sm">
            <p className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
              {active.category}
            </p>
            <p className="mt-1 font-semibold text-base">{active.label}</p>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">{active.description}</p>
            <ul className="mt-3 space-y-1">
              {active.features.map((f) => (
                <li key={f} className="text-[11px] text-white/70 flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>{active.splatCount}</span>
              <span>{active.size}</span>
            </div>
          </div>

          {/* Controls hint (bottom-left) */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[11px] text-white/60 font-mono">
            Arrastra para rotar · Botón derecho para mover · Scroll para zoom
          </div>

          {/* Credit + back (bottom-right) */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
            <div className="text-right text-[10px] text-white/40 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 max-w-[260px]">
              <p>
                Captura por{" "}
                {active.creatorLink ? (
                  <a
                    href={active.creatorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white underline underline-offset-2"
                  >
                    {active.creator}
                  </a>
                ) : (
                  <span className="text-white/70">{active.creator}</span>
                )}{" "}
                · {active.license}
              </p>
              <a
                href={active.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 underline underline-offset-2"
              >
                Fuente original ↗
              </a>
            </div>
            <Link
              href="/"
              className="text-xs text-white/60 hover:text-white transition bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
