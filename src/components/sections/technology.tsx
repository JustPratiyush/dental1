"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/motion/reveal";
import { techPoints } from "@/lib/content";

// Client-only, code-split frameless 3D denture that faces the cursor.
const DentureScene = dynamic(() => import("@/components/three/denture-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

export function Technology() {
  return (
    <section
      id="technology"
      aria-label="Technology"
      className="bg-hero-copper grain relative isolate overflow-hidden text-ivory"
    >
      {/* Oversized denture — sits high, looks down, clipped by the section top */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <DentureScene />
      </div>
      {/* Readability scrim over the text side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-2/3 bg-gradient-to-r from-[rgba(18,3,2,0.72)] via-[rgba(18,3,2,0.22)] to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-36">
        <div className="max-w-xl">
          <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
            (05) — Technology
          </Reveal>
          <Reveal
            as="div"
            delay={1}
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.08] tracking-tight"
          >
            Precision you can see on screen before you ever feel it.
          </Reveal>
          <Reveal as="p" delay={2} className="mt-6 max-w-md text-cream/75">
            Every implant is planned in 3D from a low-dose CT scan, then placed through a
            guide printed for your jaw alone. Less guesswork, smaller incisions, faster healing.
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2">
            {techPoints.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i}
                className="border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.16]"
              >
                <p className="font-display text-lg font-semibold text-ivory">{p.title}</p>
                <p className="mt-1 text-sm text-cream/65">{p.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
