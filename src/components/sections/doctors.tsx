import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { doctors } from "@/lib/content";

export function Doctors() {
  return (
    <section
      id="doctors"
      aria-label="Practitioners"
      className="bg-hero-copper grain relative isolate text-ivory"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <header className="mb-14 flex flex-col gap-4">
          <Reveal as="span" className="text-sm font-medium uppercase tracking-[0.18em] text-gold">
            (03) — The practitioners
          </Reveal>
          <Reveal
            as="div"
            delay={1}
            className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium tracking-tight"
          >
            People, before procedures.
          </Reveal>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, i) => (
            <Reveal
              as="article"
              key={doc.name}
              delay={i}
              className="group relative transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="clip-hexcard relative aspect-[4/5] overflow-hidden bg-[#15100c]">
                <Image
                  src={doc.image}
                  alt={`Portrait of ${doc.name}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
                <span className="absolute right-4 top-4 bg-black/40 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-cream/80 backdrop-blur-sm">
                  0{i + 1}
                </span>
              </div>
              <div className="pt-5">
                <p className="text-[0.72rem] uppercase tracking-[0.14em] text-gold/90">{doc.role}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ivory">{doc.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{doc.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
