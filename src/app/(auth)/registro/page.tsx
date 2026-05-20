"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al crear la cuenta");
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (login?.error) {
        setError("Cuenta creada pero hubo un error al iniciar sesión. Intenta en /login.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="font-bold text-lg">Vista3D</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Crea tu cuenta gratis</h1>
          <p className="mt-2 text-sm text-white/50">Sin tarjeta · Plan Free incluido</p>
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
            <label className="block text-xs font-medium text-white/60 mb-1.5">Nombre</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Tu nombre o empresa"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20 transition"
            />
          </div>

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
              minLength={8}
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white text-black font-medium py-2.5 hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creando cuenta…" : "Crear cuenta gratis"}
          </button>

          <p className="text-center text-xs text-white/40">
            Al registrarte aceptas nuestros{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-white/70">
              Términos de servicio
            </Link>
          </p>
        </form>

        <p className="text-center mt-5 text-sm text-white/50">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-violet-300 hover:text-violet-200 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
