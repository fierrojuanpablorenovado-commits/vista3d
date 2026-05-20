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

const KHRONOS = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models";
const khronosGlb = (name: string) => `${KHRONOS}/${name}/glTF-Binary/${name}.glb`;
const khronosUrl = (name: string) => `https://github.khronos.org/glTF-Asset-Viewer/?assetId=${name}`;

const INDUSTRIES: Industry[] = [
  {
    id: "inmobiliaria",
    emoji: "🏠",
    label: "Inmobiliaria",
    pitch:
      "Tours volumétricos de propiedades reales. El agente captura la propiedad con su celular (Luma AI / Polycam) y Vista3D la sirve como un link que el comprador recorre desde su sala.",
    models: [
      {
        id: "inm-paramount",
        label: "2508 Paramount House",
        category: "Casa real · Captura fotogramétrica 3DGS",
        src: "https://d28zzqy0iyovbz.cloudfront.net/91c1e47e/v1/meta.json",
        size: "94 MB",
        description:
          "Captura Gaussian Splat profesional de una casa real — sala, cocina, pasillos y cuartos escaneados con cámara DSLR y DJI Pocket. El comprador recorre cada habitación como si estuviera ahí. Esto es lo que Vista3D entrega a tus clientes inmobiliarios.",
        features: [
          "Casa completa explorable en 360°",
          "Calidad DSLR — texturas y luz fotorrealistas",
          "Sin app — funciona en cualquier navegador",
          "Link privado compartible por WhatsApp",
        ],
        creator: "@cameroncone",
        license: "Captura propia — uso demo",
        sourceUrl: "https://superspl.at/scene/91c1e47e",
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
      "Inventario 360° del lote o agencia. Cada unidad rota frente al cliente como en showroom — sin moverla del piso. La agencia ya tiene los modelos 3D del fabricante o capturas propias.",
    models: [
      {
        id: "auto-concept",
        label: "CarConcept",
        category: "Vehículo · Concept car PBR",
        src: khronosGlb("CarConcept"),
        size: "11.2 MB",
        description:
          "Concept car con paint shader profesional, variantes de material y geometría limpia. Demuestra cómo se ve un auto de fabricante exhibido en Vista3D — el cliente lo gira, hace zoom a la llanta, ve cada ángulo.",
        features: ["Paint shader PBR", "Variantes de color", "Geometría optimizada", "Listo para web"],
        creator: "Darmstadt Graphics Group / Eric Chadwick",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("CarConcept"),
        tech: "GLB",
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
        id: "art-dragon",
        label: "Dragón de vidrio (Attenuation Demo)",
        category: "Escultura · Vidrio traslúcido",
        src: khronosGlb("DragonAttenuation"),
        size: "6.1 MB",
        description:
          "Escultura de dragón en vidrio con renderizado de atenuación volumétrica realista. Muestra cómo Vista3D maneja materiales complejos — translúcidos, transparentes, refracciones — que son comunes en piezas de museo y arte contemporáneo.",
        features: ["Material translúcido", "Atenuación volumétrica", "Renderizado PBR", "Pieza de exhibición"],
        creator: "Morgan McGuire / NVIDIA",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("DragonAttenuation"),
        tech: "GLB",
      },
    ],
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label: "E-commerce y producto",
    pitch:
      "Productos volumétricos en la ficha de producto. El comprador rota, hace zoom y ve el detalle como si lo tuviera en la mano — antes de comprar. Reduce devoluciones, aumenta conversión.",
    models: [
      {
        id: "prod-boombox",
        label: "BoomBox",
        category: "Producto · Audio retro",
        src: khronosGlb("BoomBox"),
        size: "10.1 MB",
        description:
          "Equipo de audio portátil con detalles fotorrealistas: parlantes, perillas, etiquetas, materiales metálicos y plásticos. Es el ejemplo canónico de cómo se ve un producto premium en e-commerce 3D.",
        features: ["Detalle fotorrealista", "Materiales mixtos", "Ideal para ficha", "Reduce devoluciones"],
        creator: "Microsoft",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("BoomBox"),
        tech: "GLB",
      },
      {
        id: "prod-bottle",
        label: "Botella de agua",
        category: "Producto · Etiquetado",
        src: khronosGlb("WaterBottle"),
        size: "8.6 MB",
        description:
          "Botella de agua con etiqueta legible, transparencia parcial y tapa metalizada. Caso típico de packaging que se beneficia de la vista 3D — el cliente ve la etiqueta desde cualquier ángulo.",
        features: ["Etiqueta 360°", "Transparencia", "Empaque premium", "FMCG ready"],
        creator: "Microsoft",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("WaterBottle"),
        tech: "GLB",
      },
    ],
  },
  {
    id: "interiorismo",
    emoji: "🛋️",
    label: "Interiorismo y decoración",
    pitch:
      "Mobiliario y decoración exhibida en 3D. Tiendas de muebles y diseñadores muestran cada pieza en alta resolución, con materiales reales, antes de que el cliente decida comprar.",
    models: [
      {
        id: "int-chair",
        label: "Silla Damasco Púrpura y Oro",
        category: "Mobiliario · Tapizado",
        src: khronosGlb("ChairDamaskPurplegold"),
        size: "1.9 MB",
        description:
          "Silla tapizada con tela damasco morada con detalles dorados. Renderizado de tela con textura tejida visible al zoom. Caso clásico de catálogo de mobiliario de gama media-alta.",
        features: ["Tela texturizada", "Zoom hasta hilo", "Bajo peso (~2 MB)", "Carga instantánea"],
        creator: "Khronos / Adobe",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("ChairDamaskPurplegold"),
        tech: "GLB",
      },
      {
        id: "int-lantern",
        label: "Lámpara de aceite ornamental",
        category: "Decoración · Iluminación",
        src: khronosGlb("Lantern"),
        size: "9.4 MB",
        description:
          "Lámpara estilo medieval con base de madera, cuerpo metálico y vidrio. Combina materiales naturales y artificiales — ideal para tiendas de decoración premium y artesanía.",
        features: ["Materiales mixtos", "Estilo artesanal", "Vidrio + metal", "Detalle ornamental"],
        creator: "Microsoft / Khronos",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("Lantern"),
        tech: "GLB",
      },
    ],
  },
  {
    id: "gastronomia",
    emoji: "🍽️",
    label: "Gastronomía",
    pitch:
      "Carta digital en 3D. El comensal ve cada platillo desde todo ángulo antes de pedir — funciona en menú QR, app de delivery o catálogo de catering. Sube ticket promedio.",
    models: [
      {
        id: "gastro-dish",
        label: "Plato con aceitunas",
        category: "Platillo · Vajilla iridiscente",
        src: khronosGlb("IridescentDishWithOlives"),
        size: "5.5 MB",
        description:
          "Plato decorado con aceitunas verdes y rojas sobre vajilla con efecto iridiscente. Muestra cómo Vista3D maneja materiales complejos (perla, vidrio reflectivo) en presentación gastronómica.",
        features: ["Material iridiscente", "Detalle fotográfico", "Apto carta QR", "Catering & delivery"],
        creator: "Khronos / Adobe",
        license: "CC BY 4.0 (Khronos sample)",
        sourceUrl: khronosUrl("IridescentDishWithOlives"),
        tech: "GLB",
      },
    ],
  },
];

export default function DemoPage() {
  const [industryId, setIndustryId] = useState<string>("inmobiliaria");
  const [modelId, setModelId] = useState<string>("inm-paramount");

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
