"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Counts up from 0 to `value` once it scrolls into view. */
export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      const node = ref.current;
      if (node) node.firstChild!.textContent = Math.round(latest).toLocaleString("en-GB");
    });
  }, [spring]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">0</span>
      {suffix}
    </span>
  );
}
