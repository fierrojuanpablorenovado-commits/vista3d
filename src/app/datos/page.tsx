import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Datos y Cumplimiento — Vista3D",
  description: "Cómo Vista3D protege tus datos: cifrado, cumplimiento LFPDPPP, aislamiento por usuario.",
};

export default function DatosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-2">Datos y Cumplimiento</h1>
        <p className="text-white/40 mb-12">Estándares de seguridad y privacidad que aplicamos.</p>

        <section className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Seguridad de datos</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Datos en reposo: cifrado AES-256</li>
              <li>Datos en tránsito: TLS 1.3</li>
              <li>Autenticación de dos factores disponible para todas las cuentas</li>
              <li>Backups automáticos diarios con retención de 30 días</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Cumplimiento regulatorio</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP — México)</li>
              <li>Compatible con GDPR para usuarios europeos</li>
              <li>Pagos PCI DSS a través de Stripe</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Aislamiento de archivos</h2>
            <p>
              Cada usuario tiene sus archivos y datos completamente separados. No existe acceso
              entre cuentas a nivel de almacenamiento ni de base de datos.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Incidentes de seguridad</h2>
            <p>
              En caso de brecha de seguridad, notificaremos a los usuarios afectados en un máximo
              de 72 horas con detalle del incidente y las medidas tomadas para resolverlo.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Solicitudes de eliminación</h2>
            <p>
              Puedes solicitar la eliminación completa de tus datos en cualquier momento escribiendo
              a{" "}
              <a
                href="mailto:contacto@vista3d.mx"
                className="text-violet-400 underline hover:text-violet-300 transition"
              >
                contacto@vista3d.mx
              </a>
              . Ejecutamos el borrado en máximo 30 días y confirmamos por email.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
