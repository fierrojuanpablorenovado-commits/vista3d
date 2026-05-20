export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-violet-500 to-orange-400" />
          <span>Vista3D · {new Date().getFullYear()}</span>
        </div>
        <p>Construido con PlayCanvas Engine · 3D Gaussian Splatting</p>
      </div>
    </footer>
  );
}
