"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const BEFORE = "/images/toothache.png";
const AFTER = "/images/toothfix.png";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const hasPlayed = useRef(false);
  const rafId = useRef<number | null>(null);

  // One-time auto demo: sweep the divider across the full range when the
  // section first scrolls into view, so the user sees there's a before/after
  // to compare. The moment they grab the handle (dragging) the sweep aborts.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const playDemo = () => {
      // Reveal more of the "after", then more of the "before", then settle.
      const waypoints = [50, 8, 92, 50];
      const segMs = 1700;
      const total = segMs * (waypoints.length - 1);
      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      let start: number | null = null;
      const step = (ts: number) => {
        if (dragging.current) return; // user took over — stop the demo
        if (start === null) start = ts;
        const elapsed = ts - start;
        const clamped = Math.min(elapsed, total);
        const seg = Math.min(Math.floor(clamped / segMs), waypoints.length - 2);
        const localT = (clamped - seg * segMs) / segMs;
        const eased = easeInOut(localT);
        setPos(waypoints[seg] + (waypoints[seg + 1] - waypoints[seg]) * eased);
        if (elapsed < total) rafId.current = requestAnimationFrame(step);
      };
      rafId.current = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayed.current) {
            hasPlayed.current = true;
            io.disconnect();
            if (!reduce) playDemo();
          }
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <section id="results" aria-label="Before and after" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <header className="mb-12 flex flex-col gap-4">
          <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-copper">
            (06) — Results
          </Reveal>
          <Reveal
            as="div"
            delay={1}
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium tracking-tight text-ink"
          >
            Before, and after.
          </Reveal>
        </header>

        <Reveal as="div" className="flex flex-col items-center gap-5">
          <div
            ref={frame}
            className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* After (full) */}
            <Image
              src={AFTER}
              alt="Smile after treatment"
              fill
              sizes="(max-width: 1024px) 92vw, 1100px"
              className="object-cover"
            />
            {/* Before (clipped) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image
                src={BEFORE}
                alt="Smile before treatment"
                fill
                sizes="(max-width: 1024px) 92vw, 1100px"
                className="object-cover"
              />
            </div>

            {/* Labels */}
            <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-wider text-ivory backdrop-blur-sm">
              Before
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-copper/90 px-3 py-1 text-xs uppercase tracking-wider text-ivory backdrop-blur-sm">
              After
            </span>

            {/* Handle */}
            <div
              role="slider"
              aria-label="Reveal before and after"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              className="absolute top-0 z-10 flex h-full w-10 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute h-full w-0.5 bg-ivory/90" />
              <span className="grid size-11 place-items-center rounded-full bg-ivory text-ink shadow-lg ring-1 ring-ink/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6 4 12l5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Upper veneers + single implant · 6-week case · drag to compare
          </p>
        </Reveal>
      </div>
    </section>
  );
}
