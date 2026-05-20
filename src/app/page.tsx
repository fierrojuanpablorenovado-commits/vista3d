import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_50%_30%,#000_30%,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.18),transparent_40%)]" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Construido sobre PlayCanvas · 3D Gaussian Splatting
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Convierte cualquier espacio en una <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              experiencia 3D
            </span>{" "}
            navegable.
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Sube tu captura volumétrica y obtén un visor web foto-realista que tus clientes pueden
            recorrer desde cualquier dispositivo. Sin instalar nada. Sin hardware especial.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/demo"
              className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition w-full sm:w-auto text-center"
            >
              Ver demo en vivo
            </Link>
            <a
              href="#como-funciona"
              className="rounded-full border border-white/15 px-6 py-3 font-medium hover:bg-white/5 transition w-full sm:w-auto text-center"
            >
              Cómo funciona
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">
            Sin tarjeta · WebGL2 + WebGPU · Compatible con .ply, .sog y .compressed.ply
          </p>
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              De fotos a un mundo navegable en 3 pasos
            </h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              Nosotros ponemos la infraestructura. Tú solo aportas el contenido.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Captura",
                body: "Toma fotos o video con tu teléfono recorriendo el espacio: una casa, un auto, una obra, un local.",
              },
              {
                step: "02",
                title: "Sube tu splat",
                body: "Carga el archivo .ply o .sog generado. Lo procesamos, lo comprimimos y lo dejamos listo en minutos.",
              },
              {
                step: "03",
                title: "Comparte",
                body: "Obtén un link público que se ve igual en celular, tablet y desktop. Embébelo en tu web o WhatsApp.",
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
              >
                <div className="text-xs font-mono text-white/40">{card.step}</div>
                <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Hecho para industrias visuales</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">
              Si tu negocio vende algo que se siente mejor en 3D, esto es para ti.
            </p>
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
              <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-white/50 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="px-6 py-20">
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
                highlight: false,
              },
              {
                name: "Pro",
                price: "$499",
                period: "MXN/mes",
                features: [
                  "10 splats activos",
                  "10,000 vistas/mes",
                  "Sin marca Vista3D",
                  "Hasta 5 GB",
                  "Links privados con clave",
                ],
                cta: "Empezar Pro",
                highlight: true,
              },
              {
                name: "Studio",
                price: "$1,499",
                period: "MXN/mes",
                features: [
                  "Splats ilimitados",
                  "Vistas ilimitadas",
                  "Dominio propio",
                  "Hasta 50 GB",
                  "Equipo + roles",
                  "Soporte prioritario",
                ],
                cta: "Hablar con ventas",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={
                  "rounded-2xl border p-6 flex flex-col " +
                  (plan.highlight
                    ? "border-violet-400/40 bg-gradient-to-b from-violet-500/10 to-transparent"
                    : "border-white/10 bg-white/[0.02]")
                }
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/15 rounded-full px-2 py-0.5">
                      Popular
                    </span>
                  )}
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
                <Link
                  href="/demo"
                  className={
                    "mt-6 block text-center rounded-full px-4 py-2.5 font-medium transition " +
                    (plan.highlight
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/15 hover:bg-white/5")
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-orange-400/10 p-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            ¿Listo para ver tu primer splat girando?
          </h2>
          <p className="mt-3 text-white/60">Tarda 8 segundos en cargar y la cámara la mueves tú.</p>
          <Link
            href="/demo"
            className="inline-block mt-8 rounded-full bg-white text-black px-8 py-3.5 font-medium hover:bg-white/90 transition"
          >
            Abrir demo
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
