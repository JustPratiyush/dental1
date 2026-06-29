"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easeLux } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger helper — multiplies a base delay. */
  delay?: number;
  /** Translate distance in px. */
  y?: number;
  as?: "div" | "li" | "span" | "p" | "figure" | "article" | "header" | "ul" | "h2";
};

/**
 * Scroll-triggered fade + rise. Animates once when ~20% in view. Falls back to
 * fully visible when JS/motion is disabled because the initial style is applied
 * by Framer only on the client.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  as = "div",
  className,
  ...props
}: RevealProps) {
  // The runtime element follows `as`; the cast keeps prop/children types coherent.
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, ease: easeLux, delay: delay * 0.09 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
