import Header from "@/components/header";
import Footer from "@/components/footer";

const EMPRESA = "Vista3D";
const EMAIL = "contacto@vista3d.mx";
const FECHA = "Mayo 2026";

export const metadata = {
  title: "Política de Privacidad — Vista3D",
  description: "Cómo recopilamos, usamos y protegemos tus datos en Vista3D.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidad</h1>
        <p className="text-white/40 mb-12">Última actualización: {FECHA}</p>

        <section className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>
              {EMPRESA} es responsable del tratamiento de los datos personales que nos proporciones.
              Contacto:{" "}
              <a href={`mailto:${EMAIL}`} className="text-violet-400 underline hover:text-violet-300 transition">
                {EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">2. Datos que recopilamos</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Nombre y correo electrónico al registrarte</li>
              <li>Archivos de captura volumétrica (.ply, .sog, .compressed.ply) que subes voluntariamente</li>
              <li>Datos de uso de la plataforma (páginas visitadas, funciones utilizadas)</li>
              <li>Información de pago procesada por terceros — no almacenamos datos de tarjeta</li>
              <li>Cookies técnicas necesarias para el funcionamiento del servicio</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cómo usamos tus datos</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Prestarte el servicio contratado (alojamiento y distribución de visores 3D)</li>
              <li>Enviarte comunicaciones relacionadas con tu cuenta</li>
              <li>Mejorar la plataforma con datos agregados y anonimizados</li>
              <li>Cumplir con obligaciones legales aplicables</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">4. Tus derechos</h2>
            <p>
              Tienes derecho a acceder, rectificar, eliminar, portar y oponerte al tratamiento
              de tus datos. Escríbenos a{" "}
              <a href={`mailto:${EMAIL}`} className="text-violet-400 underline hover:text-violet-300 transition">
                {EMAIL}
              </a>{" "}
              y respondemos en máximo 72 horas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies</h2>
            <p>
              Solo usamos cookies técnicas esenciales para el funcionamiento del servicio.
              No utilizamos cookies de publicidad ni de seguimiento de terceros.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">6. Terceros y subprocesadores</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Vercel</strong> — hosting y CDN (servidores en EE.UU.)</li>
              <li><strong className="text-white">Neon</strong> — base de datos PostgreSQL</li>
              <li><strong className="text-white">Stripe</strong> — procesamiento de pagos (PCI DSS compliant)</li>
              <li><strong className="text-white">PlayCanvas</strong> — motor 3D para el visor web</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">7. Retención de datos</h2>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa. Al cancelar, los datos
              se eliminan en un plazo máximo de 30 días, excepto donde la ley lo requiera.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cambios a esta política</h2>
            <p>
              Notificaremos cambios importantes por email y en la plataforma con al menos
              15 días de anticipación.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
