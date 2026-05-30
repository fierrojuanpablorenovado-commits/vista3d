"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "¿Necesito equipo especial para capturar el espacio?",
    a: "No. Puedes usar cualquier iPhone o Android con buena cámara. Apps como Polycam, LiDAR Scanner o RealityCapture generan el archivo .ply que subes a Vista3D. También puedes usar drones para exteriores.",
  },
  {
    q: "¿Cuánto tiempo tarda en procesarse mi splat?",
    a: "La mayoría de las escenas quedan listas en menos de 10 minutos. Modelos muy grandes (> 2 GB sin comprimir) pueden tardar hasta 30 minutos. Te notificamos por email cuando esté listo.",
  },
  {
    q: "¿Mis clientes necesitan instalar algo para ver el visor?",
    a: "No. El visor corre directamente en el navegador con WebGL2 / WebGPU. Funciona en Chrome, Safari, Edge y Firefox en escritorio y móvil. Sin apps. Sin plugins.",
  },
  {
    q: "¿Puedo embeber el visor en mi propio sitio web?",
    a: "Sí. Cada splat tiene un código de embed que pegas en tu HTML o CMS. También puedes compartirlo como link directo por WhatsApp, email o redes sociales.",
  },
  {
    q: "¿Qué pasa con mis archivos si cancelo mi cuenta?",
    a: "Tienes 30 días para descargar tus archivos originales después de cancelar. Pasado ese tiempo los eliminamos de nuestros servidores. Nunca usamos tu contenido para entrenar modelos.",
  },
  {
    q: "¿Ofrecen soporte para empresas con flujos de trabajo personalizados?",
    a: "Sí. El plan Studio incluye un manager de cuenta dedicado, onboarding personalizado, API con webhooks y posibilidad de white-label con tu propio dominio.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left gap-4 hover:text-white/90 transition"
      >
        <span className="text-base font-medium text-white/85">{q}</span>
        {open ? (
          <ChevronUp size={18} className="text-white/40 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-white/40 shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm text-white/55 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_30%,#000_30%,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.18),transparent_40%)]" />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Construido sobre PlayCanvas · 3D Gaussian Splatting
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Convierte cualquier espacio en una <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              experiencia 3D
            </span>{" "}
            navegable.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Sube tu captura volumétrica y obtén un visor web foto-realista que tus clientes pueden
            recorrer desde cualquier dispositivo. Sin instalar nada. Sin hardware especial.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link href="/demo" className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition block">
                Ver demo en vivo
              </Link>
            </motion.div>
            <a href="#como-funciona" className="rounded-full border border-white/15 px-6 py-3 font-medium hover:bg-white/5 transition">
              Cómo funciona
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-xs text-white/40">
            Sin tarjeta · WebGL2 + WebGPU · Compatible con .ply, .sog y .compressed.ply
          </motion.p>
        </motion.div>
      </section>

      {/* ── SOCIAL PROOF / STATS ── */}
      <ScrollReveal>
        <section className="px-6 py-12 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-8">Confianza de profesionales en toda LATAM</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "< 10 min", label: "Tiempo de procesamiento promedio" },
                { value: "99.9%", label: "Uptime garantizado" },
                { value: "WebGL2", label: "Sin plugins, corre en el browser" },
                { value: "4K", label: "Resolución máxima del visor" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">{s.value}</p>
                  <p className="mt-1 text-xs text-white/40 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── CÓMO FUNCIONA ── */}
      <ScrollReveal>
        <section id="como-funciona" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">De fotos a un mundo navegable en 3 pasos</h2>
              <p className="mt-3 text-white/60 max-w-xl mx-auto">Nosotros ponemos la infraestructura. Tú solo aportas el contenido.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Captura", body: "Toma fotos o video con tu teléfono recorriendo el espacio: una casa, un auto, una obra, un local." },
                { step: "02", title: "Sube tu splat", body: "Carga el archivo .ply o .sog generado. Lo procesamos, lo comprimimos y lo dejamos listo en minutos." },
                { step: "03", title: "Comparte", body: "Obtén un link público que se ve igual en celular, tablet y desktop. Embébelo en tu web o WhatsApp." },
              ].map((card) => (
                <motion.div
                  key={card.step}
                  whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="text-xs font-mono text-white/40">{card.step}</div>
                  <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── INDUSTRIAS ── */}
      <ScrollReveal>
        <section className="px-6 py-20 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Hecho para industrias visuales</h2>
              <p className="mt-3 text-white/60 max-w-xl mx-auto">Si tu negocio vende algo que se siente mejor en 3D, esto es para ti.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Inmobiliarias", desc: "Tours sin agendar visitas" },
                { name: "Automotriz", desc: "Inventario 360° clickeable" },
                { name: "Eventos y bodas", desc: "Recuerdos navegables" },
                { name: "Museos y arte", desc: "Piezas vistas desde todo ángulo" },
                { name: "Construcción", desc: "Reportes de obra en 3D" },
                { name: "Retail", desc: "Showrooms virtuales" },
                { name: "Turismo", desc: "Destinos en vivo" },
                { name: "E-commerce", desc: "Productos volumétricos" },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.3)" }}
                  transition={{ duration: 0.15 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 cursor-default"
                >
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-white/50 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── TESTIMONIOS ── */}
      <ScrollReveal>
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Lo que dicen los primeros usuarios</h2>
              <p className="mt-3 text-white/60">Profesionales que ya están usando Vista3D con sus clientes.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Mis clientes quedaron impresionados. El tour 3D del departamento se lo mandé por WhatsApp y me cerraron la operación sin necesitar visita física.",
                  name: "Carlos M.",
                  role: "Agente Inmobiliario · CDMX",
                  initials: "CM",
                  color: "from-violet-500 to-fuchsia-500",
                },
                {
                  quote: "Antes mostraba el inventario de autos con fotos. Ahora el cliente puede girar el coche y ver cada ángulo desde su celular. Las visitas aumentaron 40%.",
                  name: "Laura V.",
                  role: "Directora Comercial · Agencia Automotriz",
                  initials: "LV",
                  color: "from-fuchsia-500 to-orange-400",
                },
                {
                  quote: "Para museos es perfecto. Montamos una exposición virtual en 2 días y llegamos a personas de 12 países que jamás hubieran podido visitarnos físicamente.",
                  name: "Rodrigo A.",
                  role: "Curador Digital · Arte Contemporáneo",
                  initials: "RA",
                  color: "from-orange-400 to-violet-500",
                },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4"
                >
                  <p className="text-sm text-white/70 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{t.name}</p>
                      <p className="text-xs text-white/45">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── PRICING ── */}
      <ScrollReveal>
        <section id="precios" className="px-6 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Precios simples</h2>
              <p className="mt-3 text-white/60">Empieza gratis. Crece cuando tus clientes pidan más.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: "Free",
                  price: "$0",
                  period: "/mes",
                  features: ["1 splat activo", "500 vistas/mes", "Marca Vista3D", "Hasta 100 MB"],
                  cta: "Empezar gratis",
                  href: "/registro",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$499",
                  period: "MXN/mes",
                  features: ["10 splats activos", "10,000 vistas/mes", "Sin marca Vista3D", "Hasta 5 GB", "Links privados con clave"],
                  cta: "Empezar Pro",
                  href: "/registro",
                  highlight: true,
                },
                {
                  name: "Studio",
                  price: "$1,499",
                  period: "MXN/mes",
                  features: ["Splats ilimitados", "Vistas ilimitadas", "Dominio propio", "Hasta 50 GB", "Equipo + roles", "Soporte prioritario"],
                  cta: "Hablar con ventas",
                  href: "mailto:contacto@vista3d.mx",
                  highlight: false,
                },
              ].map((plan) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={"rounded-2xl border p-6 flex flex-col " + (plan.highlight ? "border-violet-400/40 bg-gradient-to-b from-violet-500/10 to-transparent" : "border-white/10 bg-white/[0.02]")}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.highlight && <span className="text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/15 rounded-full px-2 py-0.5">Popular</span>}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-white/50">{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-white/70 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-6">
                    <Link
                      href={plan.href}
                      className={"block text-center rounded-full px-4 py-2.5 font-medium transition " + (plan.highlight ? "bg-white text-black hover:bg-white/90" : "border border-white/15 hover:bg-white/5")}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── FAQ ── */}
      <ScrollReveal>
        <section id="faq" className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Preguntas frecuentes</h2>
              <p className="mt-3 text-white/60">Todo lo que necesitas saber antes de empezar.</p>
            </div>
            <div className="divide-y divide-white/10">
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── CTA FINAL ── */}
      <ScrollReveal>
        <section className="px-6 py-20">
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto text-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-orange-400/10 p-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">¿Listo para ver tu primer splat girando?</h2>
            <p className="mt-3 text-white/60">Tarda 8 segundos en cargar y la cámara la mueves tú.</p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-8">
              <Link href="/demo" className="rounded-full bg-white text-black px-8 py-3.5 font-medium hover:bg-white/90 transition">
                Abrir demo
              </Link>
            </motion.div>
            <p className="mt-4 text-xs text-white/30">Sin tarjeta de crédito · Listo en 5 minutos</p>
          </motion.div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  );
}
