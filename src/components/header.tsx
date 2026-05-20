import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-orange-400 group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-tight text-white">Vista3D</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/70">
          <Link href="/demo" className="hover:text-white transition">
            Demo
          </Link>
          <a href="#precios" className="hover:text-white transition hidden sm:inline">
            Precios
          </a>
          <Link
            href="/demo"
            className="rounded-full bg-white text-black px-4 py-1.5 font-medium hover:bg-white/90 transition"
          >
            Probar ahora
          </Link>
        </nav>
      </div>
    </header>
  );
}
