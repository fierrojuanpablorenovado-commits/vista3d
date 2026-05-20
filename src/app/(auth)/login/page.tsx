"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="font-bold text-lg">Vista3D</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Bienvenido de vuelta</h1>
          <p className="mt-2 text-sm text-white/50">Accede a tu dashboard de splats</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4"
        >
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Tu contraseña"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-black font-medium py-2.5 hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-white/50">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-violet-300 hover:text-violet-200 font-medium">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
