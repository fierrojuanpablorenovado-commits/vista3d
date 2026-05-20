import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSplatsByUser } from "@/lib/db";
import Link from "next/link";
import { signOut } from "@/lib/auth";

const PLAN_LIMITS = {
  free: { splats: 1, views: 500, label: "Free" },
  pro: { splats: 10, views: 10000, label: "Pro" },
  studio: { splats: Infinity, views: Infinity, label: "Studio" },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const plan = ((session.user as { plan?: string }).plan ?? "free") as keyof typeof PLAN_LIMITS;
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
  const splats = await getSplatsByUser(session.user.id!);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top nav */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs">
              V
            </div>
            <span className="font-bold">Vista3D</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50">{session.user.email}</span>
            <span
              className={
                "text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full " +
                (plan === "pro"
                  ? "bg-violet-500/20 text-violet-300"
                  : plan === "studio"
                  ? "bg-orange-500/20 text-orange-300"
                  : "bg-white/10 text-white/50")
              }
            >
              {limits.label}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-xs text-white/50 hover:text-white transition px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis Splats</h1>
            <p className="text-sm text-white/50 mt-1">
              {splats.length} / {limits.splats === Infinity ? "∞" : limits.splats} splats activos
            </p>
          </div>
          {splats.length < limits.splats ? (
            <Link
              href="/dashboard/nuevo"
              className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              + Subir splat
            </Link>
          ) : (
            <Link
              href="/#precios"
              className="rounded-full border border-violet-400/40 text-violet-300 px-5 py-2 text-sm font-medium hover:bg-violet-500/10 transition"
            >
              Upgrade para más
            </Link>
          )}
        </div>

        {/* Splat grid */}
        {splats.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-16 text-center">
            <div className="text-5xl mb-4">✦</div>
            <h2 className="text-lg font-semibold">Sube tu primer Gaussian Splat</h2>
            <p className="mt-2 text-sm text-white/50 max-w-sm mx-auto">
              Captura cualquier espacio con Scaniverse (gratis), exporta el .ply y súbelo aquí. En
              minutos tendrás un link que tus clientes pueden explorar.
            </p>
            <Link
              href="/dashboard/nuevo"
              className="inline-block mt-6 rounded-full bg-white text-black px-6 py-2.5 text-sm font-medium hover:bg-white/90 transition"
            >
              Subir primer splat
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {splats.map((splat) => (
              <div
                key={splat.id}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition group"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video rounded-lg bg-white/5 mb-3 flex items-center justify-center text-white/20 text-xs font-mono overflow-hidden">
                  <Link
                    href={`/view/${splat.id}`}
                    className="w-full h-full flex items-center justify-center hover:text-white/50 transition"
                  >
                    ▶ Ver splat
                  </Link>
                </div>
                <p className="font-semibold text-sm truncate">{splat.name}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-white/40">
                  <span>{splat.views} vistas</span>
                  {splat.size_bytes && (
                    <span>{(splat.size_bytes / 1024 / 1024).toFixed(0)} MB</span>
                  )}
                  <span className={splat.is_public ? "text-emerald-400" : "text-white/30"}>
                    {splat.is_public ? "Público" : "Privado"}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/view/${splat.id}`}
                    className="flex-1 text-center text-xs rounded-lg border border-white/10 py-1.5 hover:bg-white/5 transition"
                  >
                    Abrir
                  </Link>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/view/${splat.id}`)}
                    className="flex-1 text-center text-xs rounded-lg border border-white/10 py-1.5 hover:bg-white/5 transition"
                  >
                    Copiar link
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade CTA for free users */}
        {plan === "free" && (
          <div className="mt-10 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">¿Quieres más splats y sin marca Vista3D?</p>
              <p className="text-xs text-white/50 mt-1">
                Plan Pro: 10 splats, 10,000 vistas/mes, links privados — $499 MXN/mes
              </p>
            </div>
            <Link
              href="/#precios"
              className="flex-shrink-0 rounded-full bg-violet-500 text-white px-4 py-2 text-sm font-medium hover:bg-violet-400 transition"
            >
              Ver planes
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
