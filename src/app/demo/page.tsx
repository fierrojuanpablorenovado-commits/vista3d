"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";

type Industry = {
  id: string;
  emoji: string;
  label: string;
  sceneId: string;
};

// Official PlayCanvas / SuperSplat hosted viewer.
// Handles depth-sort convergence, camera framing, controls — production-grade.
const viewerUrl = (sceneId: string) =>
  `https://superspl.at/scene/${sceneId}?noui=1`;

const INDUSTRIES: Industry[] = [
  { id: "inmobiliaria", emoji: "🏠", label: "Inmobiliaria", sceneId: "91c1e47e" },
  { id: "automotriz",   emoji: "🚗", label: "Automotriz",   sceneId: "b83d5661" },
  { id: "museos",       emoji: "🏛️", label: "Museos y arte", sceneId: "87be70ba" },
  { id: "ecommerce",    emoji: "🛒", label: "E-commerce",   sceneId: "5fc523cd" },
  { id: "interiorismo", emoji: "🛋️", label: "Interiorismo",  sceneId: "d7c90b1b" },
  { id: "gastronomia",  emoji: "🍽️", label: "Gastronomía",   sceneId: "f8747113" },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  const industry =
    INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Industry tabs */}
        <div className="border-b border-white/10 bg-black/80 backdrop-blur-md overflow-x-auto shrink-0">
          <div className="flex gap-1 px-3 py-2 min-w-max">
            {INDUSTRIES.map((i) => {
              const active = i.id === industryId;
              return (
                <button
                  key={i.id}
                  onClick={() => setIndustryId(i.id)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex items-center gap-2 " +
                    (active
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white hover:bg-white/5")
                  }
                >
                  <span className="text-base leading-none">{i.emoji}</span>
                  {i.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer — official SuperSplat hosted viewer, handles everything */}
        <div className="flex-1 relative overflow-hidden bg-black">
          <iframe
            key={industry.id}
            src={viewerUrl(industry.sceneId)}
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; xr-spatial-tracking"
            title={`Vista 3D — ${industry.label}`}
          />

          <Link
            href="/"
            className="absolute bottom-4 right-4 z-30 text-xs text-white/40 hover:text-white/80 transition bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
          >
            ← Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
