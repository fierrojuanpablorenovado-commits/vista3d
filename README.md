# Vista3D

SaaS multi-tenant para 3D Gaussian Splatting. Sube tu captura volumétrica y obtén un visor web foto-realista compartible.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4
- PlayCanvas Engine 2.18 (WebGL2 + WebGPU)
- 3D Gaussian Splatting nativo (.ply, .sog, .compressed.ply)

## Desarrollo local

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start    # producción
```

> Nota: el HMR de Next.js recrea la app de PlayCanvas en cada hot-reload, lo cual aborta descargas grandes de splats a la mitad. Para probar la experiencia real de carga, usa `pnpm build && pnpm start`.

## Arquitectura

```
src/
├── app/
│   ├── page.tsx          Landing
│   ├── demo/page.tsx     Visor con splat público (Sunnyvale)
│   └── layout.tsx
├── components/
│   ├── splat-viewer.tsx           Visor PlayCanvas vanilla (client-only)
│   ├── splat-viewer-client.tsx    Wrapper con dynamic import (ssr: false)
│   ├── header.tsx / footer.tsx
└── lib/utils.ts
```

## Fases del producto

- **Fase 1 (actual):** Landing + visor público con splat de demo hardcodeado.
- **Fase 2:** Auth (Clerk/NextAuth) + Neon Postgres + multi-tenancy por org.
- **Fase 3:** Upload de splats a Vercel Blob, links públicos compartibles, vistas tracking.
- **Fase 4:** Stripe billing por tier (Free / Pro / Studio).
- **Fase 5:** Pipeline de generación de splats desde fotos/video (servicio externo con GPU).

## Cómo agregar un splat

El componente `<SplatViewer>` acepta:

- `src`: URL absoluta a `.ply`, `.sog` o `.compressed.ply` (CORS abierto requerido).
- `splatRotation`: Euler degrees `[x, y, z]`. Capturas reales suelen necesitar `[0, 0, 180]`.
- `cameraStart`: `{ position, lookAt }` en coordenadas mundo. Para escenas grandes (calles, edificios) usa coordenadas explícitas; para objetos centrados omítelo y deja el auto-framing por AABB.

## Licencia

MIT
