"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/lib/content";
import { easeLux } from "@/lib/motion";

/** Frosted condensed nav that slides in after the hero leaves the viewport. */
export function StickyNav() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (typeof window !== "undefined") {
      setShow(y > window.innerHeight * 0.9);
    }
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
          className="fixed inset-x-0 top-0 z-[100]"
        >
          <nav
            aria-label="Primary"
            className="radius-full mx-auto mt-3 flex max-w-xl items-center justify-between border border-border/70 bg-card/80 px-4 py-2.5 shadow-lg shadow-ink/5 backdrop-blur-xl sm:px-6"
          >
            <a href="#top" className="flex items-center gap-2 text-ink" aria-label="Denta home">
              <span className="grid size-5 grid-cols-2 gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="rounded-[2px] bg-copper" />
                ))}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">Denta</span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-copper"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <a
              href="#booking"
              className="radius-full bg-copper px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-rust"
            >
              Book
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
