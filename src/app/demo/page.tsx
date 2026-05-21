"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";

type Model = {
  id: string;
  src: string;
  image: string;
  splatRotation?: [number, number, number];
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
};

type Industry = {
  id: string;
  emoji: string;
  label: string;
  model: Model;
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
    model: {
      id: "inm-paramount",
      src: splatUrl("91c1e47e"),
      image: unsplash("photo-1600585154340-be6161a56a0c"),
    },
  },
  {
    id: "automotriz",
    emoji: "🚗",
    label: "Automotriz",
    model: {
      id: "auto-lambo",
      src: splatUrl("b83d5661"),
      image: unsplash("photo-1686440706407-17ab9d4578ed"),
    },
  },
  {
    id: "museos",
    emoji: "🏛️",
    label: "Museos y arte",
    model: {
      id: "museo-napoleon",
      src: splatUrl("87be70ba"),
      image: unsplash("photo-1770910195254-d0f97308c30f"),
    },
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label: "E-commerce",
    model: {
      id: "ecomm-nike",
      src: splatUrl("5fc523cd"),
      image: unsplash("photo-1542291026-7eec264c27ff"),
    },
  },
  {
    id: "interiorismo",
    emoji: "🛋️",
    label: "Interiorismo",
    model: {
      id: "int-provence",
      src: splatUrl("d7c90b1b"),
      image: unsplash("photo-1564078516393-cf04bd966897"),
    },
  },
  {
    id: "gastronomia",
    emoji: "🍽️",
    label: "Gastronomía",
    model: {
      id: "gastro-hueb",
      src: splatUrl("f8747113"),
      image: unsplash("photo-1599458252573-56ae36120de1"),
    },
  },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  const [show3D, setShow3D] = useState(false);

  const industry = useMemo(
    () => INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0],
    [industryId]
  );

  // Reset to photo whenever the tab changes
  useEffect(() => {
    setShow3D(false);
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
        <div className="flex-1 relative overflow-hidden">
          {show3D ? (
            /* ── 3D splat viewer ── */
            <>
              <SplatViewerClient
                key={industry.id}
                src={industry.model.src}
                splatRotation={industry.model.splatRotation}
                cameraStart={industry.model.cameraStart}
              />
              {/* Tiny back button */}
              <button
                onClick={() => setShow3D(false)}
                className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/70 hover:text-white transition"
              >
                ← Foto
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[11px] text-white/40 font-mono">
                Arrastra · Scroll zoom · Botón der. para mover
              </div>
            </>
          ) : (
            /* ── Hero photo — click anywhere to open 3D ── */
            <button
              className="absolute inset-0 w-full h-full group cursor-pointer"
              onClick={() => setShow3D(true)}
              aria-label="Ver en 3D"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={industry.model.image}
                src={industry.model.image}
                alt={industry.label}
                className="w-full h-full object-cover"
              />
              {/* Subtle dark vignette */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
              {/* Hover hint — bottom center */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/0 group-hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <span className="text-base">✦</span> Ver en 3D Gaussian Splat
              </div>
            </button>
          )}

          {/* Back to home — always visible */}
          <Link
            href="/"
            className="absolute bottom-4 right-4 z-10 text-xs text-white/40 hover:text-white/80 transition bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
          >
            ← Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
