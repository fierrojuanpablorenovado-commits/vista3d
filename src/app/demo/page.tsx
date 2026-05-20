"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";

type SplatOption = {
  id: string;
  label: string;
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
  splatRotation?: [number, number, number];
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
};

type Industry = {
  id: string;
  emoji: string;
  label: string;
  pitch: string;
  splats: SplatOption[];
};

const cdn = (id: string) => `https://d28zzqy0iyovbz.cloudfront.net/${id}/v1/meta.json`;
const ssLink = (id: string) => `https://superspl.at/scene/${id}`;

const INDUSTRIES: Industry[] = [
  {
    id: "inmobiliaria",
    emoji: "🏠",
    label: "Inmobiliaria",
    pitch:
      "Tours volumétricos para vender propiedades sin visitas físicas. El comprador recorre el inmueble desde su sala.",
    splats: [
      {
        id: "provence",
        label: "Casa con jardín en Provence",
        category: "Residencial de lujo · Exterior",
        src: cdn("ec388ae7"),
        size: "143 MB",
        splatCount: "13.9M splats",
        description:
          "Propiedad provençal de 2 plantas con alberca, olivar, viñedo y jardín de 5,000 m². Captura completa del exterior y perímetro.",
        features: ["Alberca + jardines", "5,000 m² capturados", "Recorrido perimetral", "Iluminación natural"],
        creator: "Aurélien Camart",
        creatorLink: "https://www.linkedin.com/in/aurélien-camart-97ab9929/",
        license: "CC BY 4.0",
        sourceUrl: ssLink("ec388ae7"),
      },
      {
        id: "paramount",
        label: "2508 Paramount House",
        category: "Residencial · Walkthrough interior",
        src: cdn("91c1e47e"),
        size: "94 MB",
        splatCount: "Multi-room",
        description:
          "Interior completo de casa residencial — todos los ambientes unificados en un solo splat navegable, con detección de colisión para walkthrough.",
        features: ["Interior multi-cuarto", "Walkthrough completo", "Detalle alta resolución", "Pipeline inmobiliario"],
        creator: "cameroncone",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("91c1e47e"),
      },
    ],
  },
  {
    id: "automotriz",
    emoji: "🚗",
    label: "Automotriz",
    pitch:
      "Inventario 360° clickeable para agencias y lotes. Cada auto rota frente al cliente como en pantalla de showroom.",
    splats: [
      {
        id: "mazda",
        label: "Mazda MX-5 ND RF Miata",
        category: "Auto deportivo · Captura exterior",
        src: cdn("712a5650"),
        size: "~90 MB",
        splatCount: "Vehicle scan",
        description:
          "Captura completa de un Mazda MX-5 Miata techo duro retráctil. Carrocería, llantas, vidrios y reflejos preservados en 3D navegable.",
        features: ["Carrocería 360°", "Reflejos preservados", "Detalle de llantas", "Cero modelado manual"],
        creator: "gorank",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("712a5650"),
      },
    ],
  },
  {
    id: "museos",
    emoji: "🏛️",
    label: "Museos y arte",
    pitch:
      "Patrimonio y piezas vistas desde todo ángulo, sin riesgo de manipulación. Catalogación digital perpetua.",
    splats: [
      {
        id: "doha",
        label: "Museo de Arte Islámico, Doha",
        category: "Arquitectura · Patrimonio",
        src: cdn("94259401"),
        size: "~150 MB",
        splatCount: "Arquitectura completa",
        description:
          "Captura del icónico Museo de Arte Islámico en Doha, Qatar (2023) — diseñado por I.M. Pei. Fachada exterior con detalle escultórico.",
        features: ["Arquitectura icónica", "Detalle escultórico", "Captura outdoor", "Patrimonio digital"],
        creator: "brandtales",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("94259401"),
      },
      {
        id: "trex",
        label: "Tyrannosaurus Rex",
        category: "Pieza de museo · Paleontología",
        src: cdn("da96b300"),
        size: "~60 MB",
        splatCount: "Specimen scan",
        description:
          "Esqueleto completo de T-Rex capturado con técnica MipMap. Cada hueso visible desde todo ángulo para investigación o exhibición digital.",
        features: ["Esqueleto 360°", "MipMap quality", "Apto para AR", "Reproducción remota"],
        creator: "ethan3111",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("da96b300"),
      },
    ],
  },
  {
    id: "turismo",
    emoji: "✈️",
    label: "Turismo y patrimonio",
    pitch:
      "Destinos icónicos navegables en navegador. Pre-visita virtual antes de comprar el tour, o gemelo digital para conservación.",
    splats: [
      {
        id: "civita",
        label: "Civita di Bagnoregio",
        category: "Pueblo histórico · Italia",
        src: cdn("251b52bb"),
        size: "~200 MB",
        splatCount: "Aerial + ground scan",
        description:
          "El pueblo italiano \"que muere\" — encaramado en una colina de tufo erosionada. Captura aérea y terrestre del centro histórico medieval.",
        features: ["Vista aérea", "Centro histórico", "Captura por CyArk", "Conservación patrimonial"],
        creator: "CyArk",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("251b52bb"),
      },
      {
        id: "cochem",
        label: "Castillo Imperial de Cochem",
        category: "Castillo medieval · Alemania",
        src: cdn("9b18007e"),
        size: "~150 MB",
        splatCount: "Castle scan",
        description:
          "Castillo Imperial de Cochem sobre el río Mosel en Alemania. Captura exterior detallada con torres, muros y entorno boscoso.",
        features: ["Arquitectura medieval", "Entorno natural", "Turismo virtual", "Material para marketing"],
        creator: "dok11",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("9b18007e"),
      },
    ],
  },
  {
    id: "ecommerce",
    emoji: "🍓",
    label: "E-commerce y producto",
    pitch:
      "Productos volumétricos en la ficha del e-commerce. El cliente gira el producto como si lo tuviera en la mano antes de comprar.",
    splats: [
      {
        id: "fresa",
        label: "Fresa fotorrealista",
        category: "Producto · Alimentación premium",
        src: cdn("84df8849"),
        size: "~25 MB",
        splatCount: "Hero product",
        description:
          "Una fresa real capturada con detalle de superficie y subsuperficie. El splat más visto de SuperSplat (48k vistas) — referencia de calidad fotográfica.",
        features: ["Calidad foto-real", "Granular detail", "Ideal para fichas web", "Carga rápida"],
        creator: "danylyon",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("84df8849"),
      },
    ],
  },
  {
    id: "retail",
    emoji: "☕",
    label: "Retail y gastronomía",
    pitch:
      "Showrooms y locales gastronómicos navegables. El cliente recorre el espacio antes de reservar mesa o visitar la tienda.",
    splats: [
      {
        id: "coffee",
        label: "Coffee Shop",
        category: "Local comercial · Interior",
        src: cdn("6a0c3ccf"),
        size: "~120 MB",
        splatCount: "Full interior",
        description:
          "Interior completo de una cafetería capturado con técnica MipMap. Mostrador, mobiliario, iluminación de ambiente y productos visibles.",
        features: ["Interior comercial", "Ambiente real", "Mobiliario detallado", "Marketing experiencial"],
        creator: "ethan3111",
        license: "Ver en SuperSplat",
        sourceUrl: ssLink("6a0c3ccf"),
      },
    ],
  },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  const [splatId, setSplatId] = useState<string>("provence");

  const industry = useMemo(
    () => INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0],
    [industryId]
  );
  const splat = useMemo(
    () => industry.splats.find((s) => s.id === splatId) ?? industry.splats[0],
    [industry, splatId]
  );

  const onPickIndustry = (id: string) => {
    setIndustryId(id);
    const ind = INDUSTRIES.find((i) => i.id === id);
    if (ind && ind.splats.length > 0) {
      setSplatId(ind.splats[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Industry tabs (top, full-width strip) */}
        <div className="border-b border-white/10 bg-black/80 backdrop-blur-md overflow-x-auto">
          <div className="flex gap-1 px-3 py-2 min-w-max">
            {INDUSTRIES.map((i) => {
              const active = i.id === industryId;
              return (
                <button
                  key={i.id}
                  onClick={() => onPickIndustry(i.id)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex items-center gap-2 " +
                    (active
                      ? "bg-white text-black"
                      : "text-white/70 hover:text-white hover:bg-white/5")
                  }
                >
                  <span className="text-base leading-none">{i.emoji}</span>
                  {i.label}
                  <span
                    className={
                      "text-[10px] font-mono px-1.5 py-0.5 rounded " +
                      (active ? "bg-black/10 text-black/60" : "bg-white/10 text-white/50")
                    }
                  >
                    {i.splats.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer */}
        <div className="flex-1 relative">
          <SplatViewerClient
            key={`${industry.id}-${splat.id}`}
            src={splat.src}
            splatRotation={splat.splatRotation}
            cameraStart={splat.cameraStart}
          />

          {/* Splat selector (when industry has multiple splats) */}
          {industry.splats.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex gap-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-md p-1">
                {industry.splats.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSplatId(s.id)}
                    className={
                      "px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap " +
                      (s.id === splatId
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white hover:bg-white/5")
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Industry pitch (top-right, small) */}
          <div className="absolute top-4 right-4 z-10 max-w-xs bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs">
            <p className="flex items-center gap-2 font-semibold">
              <span className="text-base leading-none">{industry.emoji}</span>
              Caso de uso: {industry.label}
            </p>
            <p className="mt-1.5 text-white/60 leading-relaxed">{industry.pitch}</p>
          </div>

          {/* Splat info card (top-left) */}
          <div className="absolute top-4 left-4 z-10 max-w-xs bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-4 text-sm">
            <p className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
              {splat.category}
            </p>
            <p className="mt-1 font-semibold text-base">{splat.label}</p>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">{splat.description}</p>
            <ul className="mt-3 space-y-1">
              {splat.features.map((f) => (
                <li key={f} className="text-[11px] text-white/70 flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>{splat.splatCount}</span>
              <span>{splat.size}</span>
            </div>
          </div>

          {/* Controls hint (bottom-left) */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[11px] text-white/60 font-mono">
            Arrastra para rotar · Botón derecho para mover · Scroll para zoom
          </div>

          {/* Credit + back (bottom-right) */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
            <div className="text-right text-[10px] text-white/40 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 max-w-[280px]">
              <p>
                Captura por{" "}
                {splat.creatorLink ? (
                  <a
                    href={splat.creatorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white underline underline-offset-2"
                  >
                    {splat.creator}
                  </a>
                ) : (
                  <span className="text-white/70">{splat.creator}</span>
                )}{" "}
                · {splat.license}
              </p>
              <a
                href={splat.sourceUrl}
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
