"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "count" | "exit" | "done";

/** Broadcast that the loader is clearing, so the hero implant can drop in. */
export const REVEAL_EVENT = "denta:reveal";
function fireReveal() {
  if (typeof window === "undefined") return;
  (window as unknown as { __dentaRevealed?: boolean }).__dentaRevealed = true;
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

/**
 * Editorial loading veil — a bottom-left 0→100 counter over a deep blood
 * ground, borrowed (lightly) from the reference project's splash. Self-removing,
 * scroll-locking while active, and skipped entirely under reduced-motion.
 */
export function SplashScreen() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("count");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fireReveal();
      setPhase("done");
      return;
    }
    document.body.style.overflow = "hidden";
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          fireReveal();
          setPhase("exit");
        }, 220);
      }
    }, 13);
    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    document.body.style.overflow = "";
    const t = window.setTimeout(() => setPhase("done"), 720);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "grain fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-[#150202] p-6 transition-opacity duration-700 ease-out md:p-10",
        phase === "exit" && "pointer-events-none opacity-0",
      )}
    >
      {/* warm ember glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(226,58,38,0.32),transparent_70%)] blur-2xl" />

      {/* top row */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-2.5 text-ivory">
          <span className="grid size-5 grid-cols-2 gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="bg-ivory/95" />
            ))}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Denta</span>
        </div>
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/55">
          Boutique dental studio
        </span>
      </div>

      {/* counter */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="flex items-end gap-3">
          <span className="font-display text-[clamp(4.5rem,20vw,15rem)] font-bold leading-[0.8] tracking-tighter text-ivory tabular-nums">
            {count}
          </span>
          <span className="mb-3 font-display text-2xl font-medium text-copper-bright md:mb-5">%</span>
        </div>
        <span className="mb-2 hidden text-[0.7rem] uppercase tracking-[0.2em] text-cream/50 sm:block">
          Preparing your visit
        </span>
      </div>

      {/* progress hairline */}
      <div
        className="absolute bottom-0 left-0 z-10 h-px bg-copper-bright/80 transition-[width] duration-150 ease-out"
        style={{ width: `${count}%` }}
      />
    </div>
  );
}
