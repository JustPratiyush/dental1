import { siteConfig } from "@/lib/site";

/* Brand glyphs (lucide removed social/brand icons in v1). */
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-9h4v1.5" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const cols = [
  { title: "Studio", links: [
    { label: "Practitioners", href: "#doctors" },
    { label: "Technology", href: "#technology" },
    { label: "Results", href: "#results" },
  ] },
  { title: "Care", links: [
    { label: "Implants", href: "#treatments" },
    { label: "Veneers", href: "#treatments" },
    { label: "Aligners", href: "#treatments" },
  ] },
  { title: "Visit", links: [
    { label: "Book", href: "#booking" },
    { label: "Directions", href: "#" },
    { label: "Contact", href: "#booking" },
  ] },
];

export function SiteFooter() {
  return (
    <footer className="bg-ivory text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 border-b border-border pb-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid size-6 grid-cols-2 gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="rounded-[2px] bg-copper" />
                ))}
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">Denta</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Boutique dental studio in Barcelona. Implantology, veneers and aligners,
              delivered with the precision of fine craft.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-copper hover:text-copper"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-copper hover:text-copper"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-3 gap-8 sm:gap-14" aria-label="Footer">
            {cols.map((c) => (
              <div key={c.title} className="flex flex-col gap-3">
                <span className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.title}
                </span>
                {c.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm text-foreground/75 transition-colors hover:text-copper"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.legalName}</span>
          <span>Designed with restraint.</span>
        </div>
      </div>
    </footer>
  );
}
