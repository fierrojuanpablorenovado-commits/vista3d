"use client";

import dynamic from "next/dynamic";
import type { SplatViewerProps } from "./splat-viewer";

const SplatViewer = dynamic(() => import("./splat-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="text-white/40 text-sm font-mono">Inicializando WebGL…</div>
    </div>
  ),
});

export default function SplatViewerClient(props: SplatViewerProps) {
  return <SplatViewer {...props} />;
}

export type { SplatViewerProps };
