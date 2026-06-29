import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { stats, marqueeItems } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="By the numbers" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="div" key={s.label} delay={i} className="flex flex-col">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-none tracking-tight text-ink"
                />
                <span className="mt-3 block text-sm uppercase tracking-[0.12em] text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Specialities marquee */}
      <div className="relative overflow-hidden border-y border-border/70 py-10">
        <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap will-change-transform">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-16 text-4xl text-muted-foreground/80">
              {item}
              <span className="text-copper">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
