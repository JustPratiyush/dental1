@AGENTS.md

# Denta — Quick Reference (updated 2026-06-29)

Boutique dental studio site. Full details + decisions live in `AGENTS.md`
("Implementation Notes — Current State"). The essentials:

## Run / view
- Dev: `pnpm dev` → **http://localhost:3000 in a real browser**.
- Do NOT use VS Code/Cursor "Live Preview" (static server; 404s on `/src/main.tsx`, caches stale).

## Critical workflow rules
- **Never run `pnpm build` while `pnpm dev` is running** — it corrupts the dev `.next` and serves stale CSS/JS. If changes "aren't visible": kill dev, `rm -rf .next`, restart dev, then hard-refresh (Cmd+Shift+R).
- Swapped an image but kept the filename? Clear `.next/cache/images` + hard-refresh.

## What this is
- Next.js 16 (App Router, `src/`) · React 19 · TS · Tailwind v4 · shadcn/ui (vendored; CLI removed) · Framer Motion · GSAP · Lenis · React Three Fiber/drei/three · RHF+Zod · sonner.
- **Palette: warm blood-red** (`.bg-hero-copper`) for Hero/Doctors/Technology/Booking; cream (`bg-ivory`) for light sections + footer.
- **No rounded corners** globally (`*{border-radius:0!important}`); opt back in with the `.radius-full` utility.
- **Sharp 6-edge hexagon** doctor photos via `.clip-hexcard`.

## 3D models (`src/components/three/`)
- Hero: `Dental_Implant_texture.glb` — mouse→Y-rotation only, scroll parallax, drop-in on splash finish (`denta:reveal` event).
- Technology: `Denture_Duo_texture.glb` — frameless, high + looking down, faces cursor, red back-lighting only.
- GLBs are **Draco-compressed** (`gltf-transform optimize --simplify false --compress draco --texture-compress webp --texture-size 2048`); decoder served **locally** from `public/draco/` via `useGLTF(url, '/draco/')`.

## Content lives in data files
`src/lib/content.ts` (doctors/treatments/etc — doctor photos are Unsplash URLs), `site.ts` (SEO), `images.ts`, `schemas.ts`, `motion.ts`.
