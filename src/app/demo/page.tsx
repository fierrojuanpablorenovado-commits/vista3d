"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";

type Model = {
  id: string;
  label: string;
  category: string;
  src: string | null; // null = placeholder
  size: string;
  description: string;
  features: string[];
  creator: string;
  license: string;
  sourceUrl: string;
  sourceLabel?: string; // override for credit link text
  tech: "GLB" | "Splat" | "Pendiente";
  splatRotation?: [number, number, number];
  cameraStart?: { position: [number, number, number]; lookAt: [number, number, number] };
};

type Industry = {
  id: string;
  emoji: string;
  label: string;
  pitch: string;
  models: Model[];
};

const CDN = "https://d28zzqy0iyovbz.cloudfront.net";
const splatUrl = (id: string) => `${CDN}/${id}/v1/meta.json`;
const splatSrc = (id: string) => `https://superspl.at/scene/${id}`;

const INDUSTRIES: Industry[] = [
  {
    id: "inmobiliaria",
    emoji: "🏠",
    label: "Inmobiliaria",
    pitch:
      "Tours volumétricos de propiedades reales. El agente captura la propiedad con su celular y Vista3D la sirve como un link que el comprador recorre desde su sala — sin visita física.",
    models: [
      {
        id: "inm-paramount",
        label: "2508 Paramount House",
        category: "Casa real · Captura fotogramétrica 3DGS",
        src: splatUrl("91c1e47e"),
        size: "94 MB",
        description:
          "Casa real escaneada con Canon 5D Mark IV + DJI Pocket — sala, cocina, pasillos y cuartos. El comprador recorre cada habitación como si estuviera ahí. Así es el tour inmobiliario del futuro.",
        features: [
          "Casa completa explorable en 360°",
          "Calidad DSLR — texturas y luz fotorrealistas",
          "Sin app — funciona en cualquier navegador",
          "Link compartible por WhatsApp o portal",
        ],
        creator: "@cameroncone",
        license: "Captura pública — uso demo",
        sourceUrl: splatSrc("91c1e47e"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
  {
    id: "automotriz",
    emoji: "🚗",
    label: "Automotriz",
    pitch:
      "Inventario 360° del lote o agencia. Cada unidad rota frente al cliente como en showroom — sin moverla del piso. Captura con DSLR, sube a Vista3D, comparte link.",
    models: [
      {
        id: "auto-audi-f1",
        label: "Audi F1 Race Car",
        category: "Vehículo · Auto de carreras F1",
        src: splatUrl("b83d5661"),
        size: "16 MB",
        description:
          "Auto de carreras F1 capturado como Gaussian Splat real — cada curva de la carrocería, spoiler, llantas y logos reconstruidos fotograméticamente. El cliente gira el auto 360°, hace zoom a cualquier detalle.",
        features: [
          "Detalle fotorrealista de carrocería",
          "Spoilers, llantas y logos visibles",
          "Explorable desde cualquier ángulo",
          "16 MB — carga rápida",
        ],
        creator: "Captura pública SuperSplat",
        license: "Uso demo",
        sourceUrl: splatSrc("b83d5661"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
  {
    id: "museos",
    emoji: "🏛️",
    label: "Museos y arte",
    pitch:
      "Piezas catalogadas y exhibidas digitalmente sin riesgo físico. Museos, galerías y casas de subasta exhiben patrimonio en alta resolución, 24/7, accesible globalmente.",
    models: [
      {
        id: "museo-napoleon",
        label: "Trono de Napoleón",
        category: "Patrimonio · Pieza de museo histórica",
        src: splatUrl("87be70ba"),
        size: "31 MB",
        description:
          "El trono de Napoleón Bonaparte capturado como Gaussian Splat — telas, dorados, tallas y detalles imperiales reconstruidos fotograméticamente. Demuestra cómo Vista3D permite exhibir piezas únicas de forma segura a una audiencia global.",
        features: [
          "Patrimonio histórico digitalizado",
          "Detalle de texturas y materiales reales",
          "Accesible 24/7 desde cualquier país",
          "Elimina riesgo físico de la pieza",
        ],
        creator: "Captura pública SuperSplat",
        license: "Uso demo",
        sourceUrl: splatSrc("87be70ba"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label: "E-commerce y producto",
    pitch:
      "Productos volumétricos en la ficha de venta. El comprador rota, hace zoom y ve el detalle como si lo tuviera en la mano — antes de comprar. Reduce devoluciones, aumenta conversión.",
    models: [
      {
        id: "ecomm-nike",
        label: "Nike Running Shoe",
        category: "Producto · Calzado deportivo",
        src: splatUrl("5fc523cd"),
        size: "9 MB",
        description:
          "Tenis Nike capturado como Gaussian Splat real — suela, tejido, logo y costuras reconstruidos fotograméticamente. El cliente ve el producto desde cualquier ángulo antes de comprarlo, como si lo tuviera en la mano.",
        features: [
          "Detalle fotorrealista de materiales",
          "Suela, tejido y logo visibles al zoom",
          "9 MB — carga en segundos",
          "Reduce devoluciones por 'no era lo que esperaba'",
        ],
        creator: "Captura pública SuperSplat",
        license: "Uso demo",
        sourceUrl: splatSrc("5fc523cd"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
  {
    id: "interiorismo",
    emoji: "🛋️",
    label: "Interiorismo y decoración",
    pitch:
      "Espacios y mobiliario exhibidos en 3D. Diseñadores y tiendas de muebles muestran cada ambiente tal como quedará — el cliente recorre el espacio antes de tomar la decisión.",
    models: [
      {
        id: "int-provence",
        label: "Living Room · Maison Provençale",
        category: "Interior · Sala con chimenea",
        src: splatUrl("d7c90b1b"),
        size: "80 MB",
        description:
          "Sala elegante con chimenea en una maison provençal renovada — pisos de madera, muebles de época, iluminación cálida y texturas auténticas capturadas fotograméticamente. El cliente recorre el espacio como si ya viviera ahí.",
        features: [
          "Sala completa explorable en 360°",
          "Chimenea, muebles y texturas reales",
          "Iluminación natural fotorrealista",
          "Ideal para presentar proyectos de diseño",
        ],
        creator: "@splatmotion3dgs",
        license: "Captura pública — uso demo",
        sourceUrl: splatSrc("d7c90b1b"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
  {
    id: "gastronomia",
    emoji: "🍽️",
    label: "Gastronomía",
    pitch:
      "Carta digital en 3D y tours del restaurante. El comensal recorre el local antes de reservar, ve cada platillo en detalle — funciona en menú QR, reservaciones o catálogo de catering.",
    models: [
      {
        id: "gastro-hueb",
        label: "Restaurant Hueb · Suiza",
        category: "Restaurante · Interior real 3DGS",
        src: splatUrl("f8747113"),
        size: "58 MB",
        description:
          "Interior real del Restaurant Hueb en Suiza capturado como Gaussian Splat — mesas, decoración, iluminación y ambiente reconstruidos fotograméticamente. El cliente recorre el restaurante antes de reservar, igual que lo haría en una visita real.",
        features: [
          "Tour completo del restaurante en 3D",
          "Mesas, decoración e iluminación reales",
          "Ideal para reservaciones y eventos",
          "Diferenciador frente a competidores sin 3D",
        ],
        creator: "Captura pública SuperSplat",
        license: "Uso demo",
        sourceUrl: splatSrc("f8747113"),
        sourceLabel: "Ver escena original ↗",
        tech: "Splat",
      },
    ],
  },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  const [modelId, setModelId] = useState<string>("inm-paramount"); // default: house splat

  const industry = useMemo(
    () => INDUSTRIES.find((i) => i.id === industryId) ?? INDUSTRIES[0],
    [industryId]
  );
  const model = useMemo(
    () => industry.models.find((m) => m.id === modelId) ?? industry.models[0],
    [industry, modelId]
  );

  const onPickIndustry = (id: string) => {
    setIndustryId(id);
    const ind = INDUSTRIES.find((i) => i.id === id);
    if (ind && ind.models.length > 0) {
      setModelId(ind.models[0].id);
    }
  };

  const isPlaceholder = model.src === null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        {/* Industry tabs */}
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
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer area */}
        <div className="flex-1 relative">
          {isPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-950/40 via-black to-orange-950/30">
              <div className="max-w-md text-center px-6">
                <div className="text-6xl mb-6">🏠</div>
                <h2 className="text-2xl font-bold">Aquí va tu primera propiedad</h2>
                <p className="mt-3 text-white/60 leading-relaxed">
                  Inmobiliaria es donde el splat real brilla. Captura una propiedad con tu celular usando{" "}
                  <a
                    href="https://lumalabs.ai/luma-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-300 underline underline-offset-2"
                  >
                    Luma AI
                  </a>{" "}
                  y subimos el archivo aquí — toma ~10 min de captura + ~45 min de procesamiento automático.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-white/40 font-mono">01</div>
                    <div className="mt-1 text-white">Capturas con celular</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-white/40 font-mono">02</div>
                    <div className="mt-1 text-white">Luma AI lo procesa</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <div className="text-white/40 font-mono">03</div>
                    <div className="mt-1 text-white">Subes a Vista3D</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SplatViewerClient
              key={`${industry.id}-${model.id}`}
              src={model.src as string}
              splatRotation={model.splatRotation}
              cameraStart={model.cameraStart}
            />
          )}

          {/* Sub-model selector (when industry has multiple) */}
          {industry.models.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex gap-1 rounded-full border border-white/10 bg-black/70 backdrop-blur-md p-1">
                {industry.models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModelId(m.id)}
                    className={
                      "px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap " +
                      (m.id === modelId
                        ? "bg-white text-black"
                        : "text-white/70 hover:text-white hover:bg-white/5")
                    }
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Industry pitch (top-right) */}
          <div className="absolute top-4 right-4 z-10 max-w-xs bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-3 text-xs">
            <p className="flex items-center gap-2 font-semibold">
              <span className="text-base leading-none">{industry.emoji}</span>
              Caso de uso: {industry.label}
            </p>
            <p className="mt-1.5 text-white/60 leading-relaxed">{industry.pitch}</p>
          </div>

          {/* Model info card (top-left) */}
          <div className="absolute top-4 left-4 z-10 max-w-xs bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                {model.category}
              </span>
              <span
                className={
                  "text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded " +
                  (model.tech === "GLB"
                    ? "bg-violet-500/20 text-violet-300"
                    : model.tech === "Splat"
                    ? "bg-orange-500/20 text-orange-300"
                    : "bg-white/10 text-white/50")
                }
              >
                {model.tech}
              </span>
            </div>
            <p className="font-semibold text-base">{model.label}</p>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">{model.description}</p>
            <ul className="mt-3 space-y-1">
              {model.features.map((f) => (
                <li key={f} className="text-[11px] text-white/70 flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {!isPlaceholder && (
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>{model.tech}</span>
                <span>{model.size}</span>
              </div>
            )}
          </div>

          {/* Controls hint (bottom-left) */}
          {!isPlaceholder && (
            <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[11px] text-white/60 font-mono">
              Arrastra para rotar · Botón derecho para mover · Scroll para zoom
            </div>
          )}

          {/* Credit + back (bottom-right) */}
          <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end gap-2">
            {!isPlaceholder && (
              <div className="text-right text-[10px] text-white/40 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 max-w-[280px]">
                <p>
                  Modelo de muestra: <span className="text-white/70">{model.creator}</span> · {model.license}
                </p>
                <a
                  href={model.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white/80 underline underline-offset-2"
                >
                  {model.sourceLabel ?? "Fuente Khronos glTF Sample Assets ↗"}
                </a>
              </div>
            )}
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
