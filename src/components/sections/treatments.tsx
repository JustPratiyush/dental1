import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { treatments } from "@/lib/content";

export function Treatments() {
  return (
    <section id="treatments" aria-label="Treatments" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <header className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-copper">
              (04) — Treatments
            </Reveal>
            <Reveal
              as="div"
              delay={1}
              className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium tracking-tight text-ink"
            >
              A short, considered menu.
            </Reveal>
          </div>
          <Reveal as="p" delay={2} className="max-w-sm text-foreground/70">
            We don&apos;t try to do everything. We do a few things exceptionally, and refer
            out the rest.
          </Reveal>
        </header>

        <ul className="border-t border-border">
          {treatments.map((t, i) => (
            <Reveal
              as="li"
              key={t.no}
              delay={i}
              className="group flex cursor-pointer items-start gap-5 border-b border-border py-8 transition-colors hover:bg-card/50 md:gap-10"
            >
              <span className="mt-2 font-mono text-sm text-copper/80">{t.no}</span>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-3xl">
                  {t.name}
                </h3>
                <p className="mt-2 max-w-lg text-foreground/65">{t.description}</p>
              </div>
              <ArrowUpRight className="mt-2 size-6 shrink-0 text-copper opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
