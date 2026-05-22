"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";

type Industry = {
  id: string;
  emoji: string;
  label: string;
  splatSrc: string;
  image: string;
};

const CDN = "https://d28zzqy0iyovbz.cloudfront.net";
const splatUrl = (id: string) => `${CDN}/${id}/v1/meta.json`;
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=85&auto=format&fit=crop`;

const INDUSTRIES: Industry[] = [
  {
    id: "inmobiliaria",
    emoji: "🏠",
    label: "Inmobiliaria",
    splatSrc: splatUrl("91c1e47e"),
    image: unsplash("photo-1600585154340-be6161a56a0c"),
  },
  {
    id: "automotriz",
    emoji: "🚗",
    label: "Automotriz",
    splatSrc: splatUrl("b83d5661"),
    image: unsplash("photo-1686440706407-17ab9d4578ed"),
  },
  {
    id: "museos",
    emoji: "🏛️",
    label: "Museos y arte",
    splatSrc: splatUrl("87be70ba"),
    image: unsplash("photo-1770910195254-d0f97308c30f"),
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label: "E-commerce",
    splatSrc: splatUrl("5fc523cd"),
    image: unsplash("photo-1542291026-7eec264c27ff"),
  },
  {
    id: "interiorismo",
    emoji: "🛋️",
    label: "Interiorismo",
    splatSrc: splatUrl("d7c90b1b"),
    image: unsplash("photo-1564078516393-cf04bd966897"),
  },
  {
    id: "gastronomia",
    emoji: "🍽️",
    label: "Gastronomía",
    splatSrc: splatUrl("f8747113"),
    image: unsplash("photo-1599458252573-56ae36120de1"),
  },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  // true once the splat depth-sort has converged and the first clean frame rendered
  const [splatReady, setSplatReady] = useState(false);

  const industry = useMemo(
    () => INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0],
    [industryId]
  );

  // Reset on tab change so photo shows again while new splat loads
  useEffect(() => {
    setSplatReady(false);
  }, [industryId]);

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

        {/* Viewer */}
        <div className="flex-1 relative overflow-hidden bg-black">

          {/* 3D canvas — always mounted so download starts immediately.
              While autoRender=false the WebGL backbuffer stays transparent
              (alpha:true context) so no GPU overlay is created and the photo
              below is fully visible via normal CSS z-index. */}
          <div
            className="absolute inset-0"
            style={{ pointerEvents: splatReady ? "auto" : "none" }}
          >
            <SplatViewerClient
              key={industry.id}
              src={industry.splatSrc}
              onReady={() => setSplatReady(true)}
            />
          </div>

          {/* Photo cover — sits above the canvas (z-10) while the splat loads
              and sorts. Removed in the same React render batch as the canvas
              becomes visible, so there is no one-frame overlap. */}
          {!splatReady && (
            <div
              className="absolute inset-0 z-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${industry.image})` }}
            >
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs text-white/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Cargando escena 3D…
              </div>
            </div>
          )}

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
