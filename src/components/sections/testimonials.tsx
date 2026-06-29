import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonials" aria-label="Testimonials" className="bg-ivory">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <header className="mb-14 flex flex-col gap-4">
          <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-copper">
            (07) — In their words
          </Reveal>
          <Reveal
            as="div"
            delay={1}
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium tracking-tight text-ink"
          >
            Quietly, the best decision.
          </Reveal>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              key={t.author}
              delay={i}
              className={`flex flex-col justify-between rounded-3xl border p-7 transition-transform duration-500 hover:-translate-y-1.5 ${
                t.accent
                  ? "border-transparent bg-ink text-ivory shadow-xl"
                  : "border-border bg-card text-ink"
              }`}
            >
              <div>
                <div className="mb-5 flex gap-1" aria-label="Five out of five stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`size-4 ${t.accent ? "fill-gold text-gold" : "fill-copper text-copper"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote
                  className={`font-display text-lg leading-relaxed text-balance ${
                    t.accent ? "text-ivory" : "text-ink/85"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 flex flex-col">
                <span className="font-semibold">{t.author}</span>
                <span className={`text-sm ${t.accent ? "text-cream/60" : "text-muted-foreground"}`}>
                  {t.meta}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
