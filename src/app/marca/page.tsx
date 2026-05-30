import Header from "@/components/header";
import Footer from "@/components/footer";

const EMPRESA = "Vista3D";

export const metadata = {
  title: "Marca y Propiedad Intelectual — Vista3D",
  description: "Información sobre los derechos de marca, licencia de uso y propiedad intelectual de Vista3D.",
};

export default function MarcaPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-white mb-2">Marca y Propiedad Intelectual</h1>
        <p className="text-white/40 mb-12">Derechos sobre el software, la marca y el contenido.</p>

        <section className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Propiedad del software</h2>
            <p>
              Todo el código, diseño, algoritmos y documentación de {EMPRESA} son propiedad exclusiva
              de sus creadores. Queda prohibida la copia, reproducción o ingeniería inversa sin
              autorización expresa por escrito.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Marca y logotipo</h2>
            <p>
              El nombre "{EMPRESA}", el logotipo y la identidad visual son marcas en proceso de registro.
              No puedes usar nuestra marca en tus propios productos, servicios o materiales de marketing
              sin autorización escrita.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Licencia de uso</h2>
            <p>
              Al suscribirte obtienes una licencia limitada, no exclusiva e intransferible para usar
              el servicio según estos términos. No adquieres ningún derecho de propiedad sobre la
              plataforma ni sus componentes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Tu contenido</h2>
            <p>
              Los archivos de captura volumétrica y cualquier contenido que subas a la plataforma son
              de tu propiedad. Nos otorgas licencia para procesarlos, alojarlos y servirlos únicamente
              para prestarte el servicio contratado.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Open Source</h2>
            <p>
              Este producto utiliza dependencias de código abierto, incluyendo PlayCanvas Engine
              (licencia MIT). Sus respectivas licencias están disponibles en el repositorio del proyecto.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
