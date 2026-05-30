import Header from "@/components/header";
import Footer from "@/components/footer";

const EMPRESA = "Vista3D";
const EMAIL = "contacto@vista3d.mx";
const FECHA = "Mayo 2026";

export const metadata = {
  title: "Términos y Condiciones — Vista3D",
  description: "Términos de uso del servicio Vista3D para alojar y compartir capturas 3D.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-2">Términos y Condiciones</h1>
        <p className="text-white/40 mb-12">Última actualización: {FECHA}</p>

        <section className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación</h2>
            <p>
              Al crear una cuenta o usar {EMPRESA} aceptas estos términos. Si no estás de acuerdo,
              no uses el servicio.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">2. Descripción del servicio</h2>
            <p>
              {EMPRESA} es una plataforma SaaS para alojar capturas volumétricas (3D Gaussian Splatting)
              y distribuirlas como visores web interactivos. No generamos capturas — solo las alojamos
              y servimos. La calidad del visor depende de la calidad del archivo .ply o .sog que subas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">3. Cuenta de usuario</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Eres responsable de mantener la confidencialidad de tu contraseña</li>
              <li>Notifica de inmediato cualquier acceso no autorizado a tu cuenta</li>
              <li>Una cuenta corresponde a una empresa o persona física (no compartir credenciales)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">4. Pago y facturación</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Los planes se cobran mensualmente según tu elección</li>
              <li>Puedes cancelar en cualquier momento sin penalización</li>
              <li>No hay reembolsos por el período ya utilizado</li>
              <li>Los precios pueden cambiar con 30 días de aviso previo</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">5. Uso aceptable</h2>
            <p>Queda prohibido usar el servicio para:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Alojar contenido ilegal, obsceno o que viole derechos de terceros</li>
              <li>Ingeniería inversa de la plataforma</li>
              <li>Reventa no autorizada del servicio</li>
              <li>Saturar deliberadamente la infraestructura (DDoS, scraping masivo)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">6. Disponibilidad (SLA)</h2>
            <p>
              Nos comprometemos a un 99.5% de uptime mensual. Los mantenimientos programados
              se anunciarán con 24 horas de anticipación.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">7. Limitación de responsabilidad</h2>
            <p>
              En ningún caso {EMPRESA} será responsable por daños indirectos, pérdida de datos
              o lucro cesante. Nuestra responsabilidad máxima se limita al monto pagado en los
              últimos 3 meses.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">8. Terminación</h2>
            <p>
              Podemos suspender cuentas por violación de estos términos, con aviso previo excepto
              en casos de abuso grave o contenido ilegal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contacto</h2>
            <p>
              <a href={`mailto:${EMAIL}`} className="text-violet-400 underline hover:text-violet-300 transition">
                {EMAIL}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
