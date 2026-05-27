import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vista3D — Captura cualquier espacio en 3D real",
  description:
    "Plataforma SaaS para alojar y compartir capturas volumétricas (3D Gaussian Splatting). Sube tus splats, obtén un visor web foto-realista compartible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        {children}
        {/* Cierra CRM — Lead capture widget */}
        <Script
          src="https://cierra-crm.vercel.app/widget.js"
          strategy="lazyOnload"
          data-key={process.env.NEXT_PUBLIC_CRM_KEY || ''}
          data-project="Vista3D"
          data-title="¿Quieres capturar tu espacio en 3D?"
          data-cta="Probar Vista3D"
          data-color="#6366f1"
          data-message="false"
        />
      </body>
    </html>
  );
}
