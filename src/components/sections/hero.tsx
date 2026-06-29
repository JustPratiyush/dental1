"use client";

import { motion } from "framer-motion";
import { ImplantCanvas } from "@/components/three/implant-canvas";
import { DoctorDeck } from "./doctor-deck";
import { LiveClock } from "./live-clock";
import { easeLux } from "@/lib/motion";

const navItems = [
  { label: "Services", href: "#treatments" },
  { label: "Implants", href: "#technology" },
  { label: "Price", href: "#booking" },
  { label: "Preventive Care", href: "#philosophy" },
];

export function Hero() {
  return (
    <section
      className="bg-hero-copper grain relative isolate flex min-h-screen flex-col overflow-hidden"
      aria-label="Introduction"
    >
        {/* 3D implant — the one bold moment */}
        <ImplantCanvas className="pointer-events-none absolute inset-0 z-0" />

        {/* Soft jewel glow behind the crown/post joint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[42%] z-0 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,108,72,0.5),transparent_68%)] blur-2xl left-1/2 lg:left-[41%]"
        />
        {/* Corner vignette toward near-black */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_42%,rgba(18,2,2,0.65)_100%)]"
        />

        {/* ── Top nav (full width, quiet chrome) ── */}
        <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-9 sm:py-6">
          <a href="#top" className="flex items-center gap-2.5 text-ivory" aria-label="Denta home">
            <span className="grid size-6 grid-cols-2 gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="rounded-[2px] bg-ivory/95" />
              ))}
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Denta</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="flex items-center gap-2 text-sm tracking-wide text-cream transition-colors duration-300 hover:text-ivory"
              >
                <span className="radius-full size-[5px] bg-gold/80" aria-hidden="true" />
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#booking"
            className="rounded-full border border-white/35 px-5 py-2 text-sm text-ivory transition-colors duration-300 hover:border-white/75 hover:text-ivory"
          >
            Health Check
          </a>
        </header>

        {/* ── Middle: 70 / 30 split with a single vertical hairline ── */}
        <div className="relative z-10 flex flex-1 flex-col px-5 pb-2 pt-6 sm:px-9 lg:grid lg:grid-cols-[1fr_minmax(0,30%)]">
          {/* Single divider at the 70% boundary */}
          <span
            aria-hidden="true"
            className="absolute left-[70%] top-0 hidden h-full w-px bg-white/15 lg:block"
          />

          {/* Left / centre zone */}
          <div className="flex flex-col justify-between lg:pr-10">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeLux, delay: 0.2 }}
              className="max-w-xs text-[0.95rem] leading-relaxed text-peach"
            >
              From preventive care to complex restorations, a comprehensive approach
              to your dental health.
            </motion.p>

            <h1 className="mt-12 font-display text-[clamp(3.1rem,8.5vw,6.6rem)] leading-[0.93] tracking-[-0.03em]">
              <Line delay={0.12} className="font-light text-peach">
                Modern
              </Line>
              <Line delay={0.2} className="font-light text-peach">
                Care for
              </Line>
              <Line delay={0.28}>
                <span className="font-light text-peach">a </span>
                <span className="font-bold text-ivory">Perfect</span>
              </Line>
              <Line delay={0.36} className="font-bold text-ivory">
                Smile
              </Line>
            </h1>
          </div>

          {/* Right zone — editorial team carousel */}
          <div className="mt-10 flex flex-col justify-between lg:mt-0 lg:pl-9">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeLux, delay: 0.4 }}
              className="max-w-[16rem] text-[1.1rem] leading-relaxed text-white"
            >
              Select from our team of highly skilled and experienced dentists
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeLux, delay: 0.55 }}
              className="mt-8 w-full"
            >
              <DoctorDeck />
            </motion.div>
          </div>
        </div>

        {/* ── Footer strip below a horizontal hairline (matches 70/30) ── */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-y-4 border-t border-white/15 px-5 py-5 sm:px-9 lg:grid-cols-[1fr_minmax(0,30%)]">
          <div className="grid grid-cols-2 gap-4 lg:pr-10">
            <Meta a="Best Dentistry" b="2025" />
            <Meta a="Barcelona, Spain" b={<LiveClock />} />
          </div>
          <div className="lg:pl-9">
            <Meta a="Advanced Dental" b="Technologies" className="lg:text-right" />
          </div>
        </div>
    </section>
  );
}

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, ease: easeLux, delay }}
        className={`block ${className ?? ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Meta({
  a,
  b,
  className,
}: {
  a: React.ReactNode;
  b: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 text-[0.78rem] ${className ?? ""}`}>
      <span className="text-cream">{a}</span>
      <span className="text-peach">{b}</span>
    </div>
  );
}
