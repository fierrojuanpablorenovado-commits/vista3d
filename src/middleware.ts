// Edge Runtime middleware — zero Node.js imports.
// 1. Auth guard: protege /dashboard con cookie NextAuth v5.
// 2. CORS: preflight OPTIONS para /api solo desde dominios permitidos.
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "https://vista3d-beige.vercel.app",
  "https://vista3d.mx",
  "https://www.vista3d.mx",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin") ?? "";

  // ── CORS preflight para rutas API ────────────────────────────────────────
  if (pathname.startsWith("/api") && req.method === "OPTIONS") {
    const isAllowed = ALLOWED_ORIGINS.includes(origin);
    if (!isAllowed) return new NextResponse(null, { status: 403 });
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Tenant-ID",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // ── Auth guard para /dashboard ───────────────────────────────────────────
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const hasSession =
    req.cookies.has("authjs.session-token") ||
    req.cookies.has("__Secure-authjs.session-token");

  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/:path*"],
};
