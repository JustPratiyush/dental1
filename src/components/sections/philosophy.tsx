import { Reveal } from "@/components/motion/reveal";

export function Philosophy() {
  return (
    <section id="philosophy" aria-label="Our philosophy" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-36">
        <Reveal as="span" className="block text-sm font-medium uppercase tracking-[0.18em] text-copper">
          (02)
        </Reveal>
        <Reveal
          as="div"
          delay={1}
          className="mt-8 max-w-5xl font-display text-[clamp(1.7rem,4.2vw,3.1rem)] font-medium leading-[1.18] tracking-tight text-ink text-balance"
        >
          We kept the practice deliberately small. Fewer chairs, longer appointments,
          one surgeon who knows your name —{" "}
          <span className="text-copper">so nothing about your care feels rushed.</span>
        </Reveal>

        <Reveal
          as="div"
          delay={3}
          className="mt-12 flex max-w-xl flex-col gap-2 border-l-2 border-copper/40 pl-5"
        >
          <span className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Our philosophy
          </span>
          <p className="text-lg text-foreground/80">
            Precision, calm and restraint — the same values that guide a good architect.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
