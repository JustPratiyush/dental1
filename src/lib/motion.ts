import type { Variants, Transition } from "framer-motion";

/** Signature easing — a calm, slightly authoritative ease-out. */
export const easeLux: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 20,
  mass: 0.9,
};

/** Fade + rise, used by the <Reveal> primitive. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeLux },
  },
};

/** Container that staggers its direct <Reveal> children. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Word/line mask reveal for oversized headlines. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: easeLux, delay: 0.05 * i },
  }),
};
