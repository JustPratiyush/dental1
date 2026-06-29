"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { doctors } from "@/lib/content";
import { easeLux } from "@/lib/motion";

/**
 * The hero's dentist carousel — dark portrait cards with a peeking next card,
 * cycled by the "Next" control, mirroring the reference layout.
 */
export function DoctorDeck() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % doctors.length);

  const order = [0, 1, 2].map((o) => doctors[(index + o) % doctors.length]);

  return (
    <div className="w-full max-w-[30rem]">
      <button
        onClick={next}
        className="group mb-3 flex items-center gap-1.5 text-[0.95rem] font-medium uppercase tracking-[0.14em] text-peach transition-colors hover:text-ivory"
        aria-label="Show next dentist"
      >
        Next
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div className="relative h-[20rem] sm:h-[23rem]">
        {/* Peeking next card */}
        <div
          className="clip-hexcard absolute right-[-2.6rem] top-4 hidden h-[18rem] w-[13.5rem] overflow-hidden opacity-50 blur-[1px] sm:block"
          aria-hidden="true"
        >
          <Image
            src={order[1].image}
            alt=""
            fill
            sizes="180px"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-ink/40" />
        </div>

        {/* Active card */}
        <AnimatePresence mode="popLayout">
          <motion.figure
            key={order[0].name}
            initial={{ opacity: 0, x: 32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -28, scale: 0.98 }}
            transition={{ duration: 0.55, ease: easeLux }}
            className="clip-hexcard absolute left-0 top-0 h-full w-[17.5rem] overflow-hidden bg-ink shadow-2xl sm:w-[21rem]"
          >
            <Image
              src={order[0].image}
              alt={`Portrait of ${order[0].name}`}
              fill
              sizes="(max-width: 640px) 70vw, 336px"
              className="object-cover object-top"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-base font-semibold text-ivory">{order[0].name.replace("Dr. ", "")}</p>
              <p className="mt-0.5 text-[0.78rem] text-peach">{order[0].role}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}
