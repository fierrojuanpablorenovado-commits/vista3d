import SplatViewerClient from "@/components/splat-viewer-client";
import Header from "@/components/header";
import Link from "next/link";

const DEMO_SPLAT_URL =
  "https://code.playcanvas.com/examples_data/example_sunnyvale/sunnyvale.sog";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 relative">
          <SplatViewerClient
            src={DEMO_SPLAT_URL}
            splatRotation={[0, 0, 180]}
            cameraStart={{ position: [0, 2.9, 0], lookAt: [0, 2.5, -5] }}
          />
          <div className="absolute top-4 left-4 z-10 max-w-xs bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-1">Demo: Sunnyvale</p>
            <p className="text-white/60 text-xs mb-2">
              Captura volumétrica de una calle real, renderizada con 3D Gaussian Splatting.
            </p>
            <p className="text-white/40 text-xs font-mono">
              Arrastra para rotar · Scroll para zoom · 58 MB
            </p>
          </div>
          <div className="absolute bottom-4 right-4 z-10">
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
