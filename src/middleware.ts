// Middleware runs on Edge Runtime — must NOT import Node.js modules.
// Uses a lightweight auth config (no bcrypt, no DB) for JWT verification only.
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const { auth: middleware } = NextAuth(authConfig);
export default middleware;

export const config = {
  matcher: ["/dashboard/:path*"],
};
