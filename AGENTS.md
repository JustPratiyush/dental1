<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Project Brief

Rebuild the hero section of a dental clinic site called Denta. Reference screenshot: ref-hero.png (included in this repo — look at it directly before writing any code).

The brief already avoids the generic "AI design" defaults (cream+serif+terracotta, near-black+acid-accent, broadsheet hairlines). It's a warm, single-hue gradient with product photography standing in for a hero image. Preserve that choice faithfully — don't drift toward a more "standard" SaaS-hero look (centered headline, gradient blob, filled CTA button) while building.


Design Philosophy

These are the actual decisions that make this hero distinctive. Treat them as constraints, not suggestions.


Monochromatic warmth, not clinical cool. The entire background lives in one warm hue family — deep maroon → burnt orange → amber glow. This is a deliberate departure from the blue/mint/white that dental and medical sites default to. It signals comfort and craft rather than sterility. Do not introduce a second hue family (no blues, no greens) anywhere in this section.
The product is the hero, lit like jewelry. The dental implant is rendered as a luxury object: a rim-light/glow at the point where the crown meets the post, a soft contact shadow beneath it, perfect symmetry, isolated and centered against the gradient. No clinical diagrams, no stock photography of smiling patients — one object, shot the way a perfume bottle or a sneaker drop would be.
Typographic weight as a reading path. The headline is not one uniform style. Reading top to bottom, brightness/weight increases: muted peach → muted peach → mixed → bold white. This pulls the eye down to the phrase that matters most ("Perfect Smile"). Emphasis is built with color + weight contrast, not font-size jumps.
Hairlines, not boxes. Structure comes from one thin vertical divider and one thin horizontal footer rule — not cards, shadows, or borders. The grid should feel implied, never boxed-in.
Ambient studio metadata. The footer strip carries small, almost incidental-feeling details: an award line, a city name with a live, ticking local clock, and a category tag. None of this is essential information — its job is to borrow the visual language of high-end agency/portfolio sites and signal polish and global reach.
Quiet chrome. Nav items are dot-prefixed labels, not underlines or pills. The CTA ("Health Check") is an outlined ghost button — transparent fill, thin border — never a solid filled button. Nothing in the navigation should visually compete with the headline or the hero visual.
Editorial casting, not an HR grid. The team is shown as a single-file photo carousel with a gradient scrim at the bottom of each photo for the name label, plus a "Next →" control — a lookbook, not a "Meet the Team" card grid.
Framed canvas. The whole experience sits inset on a black page background with soft rounded corners on the main container — a screen-within-a-screen effect that adds depth before any content is even read.


Signature element: the levitating, rim-lit implant. That's the one place this design takes a real risk (treating a dental part like a luxury good). Everything else — nav, dividers, footer — should stay quiet and disciplined so that risk reads clearly instead of competing with other loud elements.


Token System


These are estimated from the screenshot, not pixel-sampled. Before coding, open ref-hero.png and sample actual pixel values for the gradient stops and text colors — treat everything below as a calibrated starting point, not ground truth.



Color

TokenApprox. valueUse--bg-deep#341a0cgradient corners / vignette edges--bg-mid#9c451dgradient midtone--bg-glow#f2954awarm highlight behind the implant base--text-muted#ddbb9aintro paragraphs, secondary nav-adjacent copy--text-bright#fdf8f2emphasized headline words, primary labels--linergba(255,255,255,0.18)vertical/horizontal dividers--border-ghostrgba(255,255,255,0.35)outlined CTA button border--metal-gold#f0cf8a → #8a5a26implant post gradient (highlight → shadow)

Background should be a layered gradient: a diagonal/radial base gradient (--bg-deep → --bg-mid) plus a soft radial glow (--bg-glow) positioned behind the implant's crown/post joint, fading to near-black at the outer corners (vignette).

Type


Display (headline): a clean, light-weight grotesque sans (think Inter, General Sans, or Neue Montreal at weight 300–400 for muted lines, 600–700 for the emphasized lines). Large size (~64–84px desktop), tight line-height, left-aligned.
Body/UI (nav, intro paragraphs, footer): the same family at a much smaller size, regular weight, slightly increased letter-spacing on nav labels.
Utility (footer metadata, "Next" label): smallest size in the system, often with reduced opacity — these should read as captions, not content.


No serif anywhere. No more than one display weight jump (light → bold) — don't introduce a third weight.

Layout


Two-column split, roughly 70/30: left/center zone (logo, nav, headline, hero visual) vs. right zone (team selector).
A single vertical hairline divider sits at that ~70% boundary, running full height from below the nav to the footer rule.
Footer is a full-width strip below a horizontal hairline, split into the same left/right proportions as the divider above it.


Signature

The product-as-jewelry hero shot (see Design Philosophy #2 and #8 above). Spend the one "bold" design risk here; keep nav, footer, and dividers minimal.


Section Anatomy & Copy

Replicate this structure and exact copy (swap placeholder names if you don't have real ones):

Top nav


Logo: small abstract two-shape mark (white) + wordmark "Denta", bold
Nav links, dot-prefixed: • Services  • Implants  • Price  • Preventive Care
Right-aligned CTA: outlined ghost button, "Health Check"


Left column


Small intro paragraph (muted): "From preventive care to complex restorations, a comprehensive approach to your dental health."
Large headline, four lines with graduated emphasis:

"Modern" (muted)
"Care for" (muted)
"a Perfect" ("a" muted, "Perfect" bold/bright)
"Smile" (bold/bright)





Center


The hero product render (implant), centered, glowing, floating with soft shadow.


Right column


Intro line (muted): "Select from our team of highly skilled and experienced dentists"
Horizontal hairline
"Next →" carousel control (small, top-left of the photo strip)
Photo cards: portrait crops of staff in clinical coats, gradient scrim at bottom, name label (e.g. "Clara Collins"), arranged edge-to-edge, partially cropped at the right edge to imply horizontal scroll/carousel


Footer bar (below horizontal hairline, split to match the vertical divider above)


Left: "Best Dentistry 2025"  +  "Barcelona, Spain" with a live, ticking local time, e.g. "17:17:03 GMT+1"
Right: "Advanced Dental Technologies"



Motion & Interaction

Keep this restrained — one orchestrated moment, not scattered effects:


Footer clock actually ticks. Implement as a real setInterval updating every second in the displayed timezone (e.g. Europe/Madrid for "Barcelona, Spain / GMT+1"), not a static string.
Implant has a very slow, subtle float — a few px of vertical drift on a long ease-in-out loop (think 4–6s cycle), like it's weightless. Nothing faster or larger; this should be almost subliminal.
Page-load: headline lines fade/slide up with a slight stagger (top line first), so the graduated-emphasis reading path is reinforced by the reveal order.
Team carousel: clicking "Next" crossfades or slides to the next photo, not a hard cut.
Hover states on nav links and the CTA: opacity or border-opacity shift only — no scale, no color hue change, no shadow pop. Chrome stays quiet per Philosophy #6.
Respect prefers-reduced-motion: disable the float and stagger, keep the clock (it's functional, not decorative).


Responsive Behavior


Below tablet width: stack to a single column — nav collapses (hamburger or simplified row), headline and intro stack above the hero visual, team carousel becomes full-width and swipeable, footer's two halves stack into two stacked rows instead of side-by-side.
The vertical divider should disappear on mobile (it's a desktop-grid device, not load-bearing content) — use horizontal hairlines between stacked sections instead.
Hero implant image should scale down but stay centered and isolated — don't let it get crowded by surrounding text once stacked.


Build Notes


Look at ref-hero.png directly for exact spacing, gradient stops, and proportions — the numbers above are a calibrated starting point, not final.
Don't add elements that aren't in the philosophy above (no badges, no extra buttons, no card shadows) just because they're common on marketing sites — restraint is part of the brief.
If you add more sections beyond this hero, carry these same tokens (color, type scale, hairline-only structure, ghost buttons) forward for consistency rather than introducing new patterns per-section.

---

# Implementation Notes — Current State (updated 2026-06-29)

The brief above is the original spec. The build has since evolved. This section is the source of truth for how the site is actually built and the decisions behind it.

## Stack
- **Next.js 16** (App Router, `src/` dir), **React 19**, **TypeScript**, **Tailwind CSS v4**.
- **shadcn/ui** components vendored into `src/components/ui/` (button, input, label, select, sonner). The `shadcn` CLI package was REMOVED from deps (it was a 204-package runtime bloat); its `tailwind.css` is inlined at `src/app/shadcn-base.css`. Re-add components via `pnpm dlx shadcn@latest add <x>`.
- **Framer Motion** (reveals, counters, headline mask, carousel), **GSAP** (only powering Lenis↔ScrollTrigger sync in the smooth-scroll provider), **Lenis** (smooth scroll), **React Three Fiber + @react-three/drei + three** (3D), **lucide-react v1** (NOTE: v1 dropped brand icons — Instagram/LinkedIn are inline SVGs in `site-footer.tsx`), **react-hook-form + zod** (booking form), **sonner** (toasts).

## Design system (`src/app/globals.css`)
- **Palette is warm/blood-red**, NOT the screenshot's copper. `.bg-hero-copper` = blood-red radial gradient, used in **Hero, Doctors, Technology, Booking**. Light sections + **Footer** use cream `bg-ivory`. Brand tokens: `--ink, --ivory, --cream, --peach, --copper, --copper-bright, --rust, --gold`.
- Fonts: **Inter** (`--font-sans`) + **Space Grotesk** (`--font-display`).
- **NO ROUNDED CORNERS anywhere** — enforced globally by `*,*::before,*::after { border-radius:0 !important }`. To opt a specific element back in, use the **`.radius-full`** utility (border-radius:9999px !important, higher specificity). Currently applied to: the sticky nav pill, its "Book" button, and the hero nav dots.
- `.clip-hexcard` = the **6-edge hexagon** (top-left + bottom-right chamfer) used for doctor photos.
- `.grain` overlay + `bg-ink-grad` / `bg-rust-grad` (now mostly unused) utilities exist.

## Sections (`src/components/sections/`) + data
- Content/data is centralized: `src/lib/content.ts` (nav, stats, doctors, treatments, tech points, testimonials), `src/lib/site.ts` (SEO/contact), `src/lib/images.ts` (external Unsplash/higgs refs), `src/lib/schemas.ts` (zod), `src/lib/motion.ts` (easing/variants).
- **Hero**: full-bleed (NO outer black frame/padding — removed), single 70% hairline, graduated light→bold headline ("Perfect"+"Smile" bright), quiet chrome, live `LiveClock` (Europe/Madrid). All hero text is full-opacity (no `/xx`).
- **Doctors**: photos are **Unsplash URLs in `content.ts`** (placeholders, not local files). Hexagon `.clip-hexcard` frames.
- **Technology**: see 3D notes below. Text is a single left column over a full-section 3D background layer + a left readability scrim.
- **BeforeAfter (Results)**: local images `/images/toothache.png` (before) + `/images/toothfix.png` (after).
- **StickyNav**: appears after scrolling past hero; width is `max-w-xl` (deliberately compact); rounded via `.radius-full`.

## 3D (`src/components/three/`)
- **Hero implant** = `public/models/Dental_Implant_texture.glb` via `implant-scene.tsx` (`ImplantCanvas` dynamic, ssr:false). Behavior: **mouse → Y-axis turntable only** (tracked via a `window` pointermove listener because the canvas is `pointer-events:none`), **scroll → rises + recedes** (parallax), **drop-in entrance** triggered by the `denta:reveal` window event the splash fires when the loader finishes. Cinematic lights: warm key + top white spot + red front-right + warm `Lightformer` env.
- **Technology denture** = `public/models/Denture_Duo_texture.glb` via `denture-scene.tsx`. Frameless, oversized, sits high + tilted to **look down**, shifted right, **faces the cursor** (Y + slight X). Lighting: front lights REMOVED — only **red accents from BEHIND** + ambient + env. Tuning knobs (top of file): `TARGET_DIAG`, `X_OFFSET`, `Y_OFFSET`, `LOOK_DOWN`.
- **Splash** (`splash-screen.tsx`): 0→100 counter; fires `denta:reveal`; reduced-motion skips it.

## GLB compression (important)
- Big GLBs are Draco-compressed with **gltf-transform**: `optimize <in> <out> --simplify false --compress draco --texture-compress webp --texture-size 2048`. `--simplify false` keeps geometry identical (no visible change); 4096→2048 textures are imperceptible. Duo model went **42MB → 1.9MB** this way.
- The **Draco decoder is served locally** from `public/draco/` (copied from three's examples) — loaded via `useGLTF(url, '/draco/')`, NO CDN. `@gltf-transform/cli` is installed only when compressing, then removed to keep deps lean.

## SEO / a11y
- `layout.tsx` metadata (OG, twitter, robots), JSON-LD `Dentist`+`WebSite` (`seo/json-ld.tsx`), `sitemap.ts`, `robots.ts`, `manifest.ts`, generated `opengraph-image.tsx`. Skip-link, ARIA on slider/carousel, `prefers-reduced-motion` honored everywhere.

## Operational gotchas (these bit us — don't repeat)
1. **NEVER run `pnpm build` while `pnpm dev` is running.** It writes over the dev server's `.next` and makes it serve STALE CSS/JS (this caused "my changes aren't visible"). To recover: kill dev, `rm -rf .next`, restart `pnpm dev`.
2. **View at `http://localhost:3000` in a REAL browser.** VS Code / Cursor "Live Preview" is a static server — it 404s on `/src/main.tsx`, can't run Next, and caches aggressively.
3. **Swapping an image but keeping the same filename** serves the old optimized copy — clear `.next/cache/images` (or restart dev) and hard-refresh (Cmd+Shift+R).
4. The folder name has a space ("claude code"), so `create-next-app .` fails on npm naming — scaffold elsewhere and move.
5. Storage: project was slimmed (removed `shadcn` + `tailwindcss-animate`, pruned store). Keep deps lean; remove one-off tools after use.