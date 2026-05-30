import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-violet-500 to-orange-400" />
          <span>© {new Date().getFullYear()} Vista3D. Todos los derechos reservados.</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5">
          <Link href="/privacidad" className="hover:text-white/70 transition">Privacidad</Link>
          <Link href="/terminos" className="hover:text-white/70 transition">Términos</Link>
          <Link href="/datos" className="hover:text-white/70 transition">Datos</Link>
          <Link href="/marca" className="hover:text-white/70 transition">Marca</Link>
        </nav>
      </div>
    </footer>
  );
}
