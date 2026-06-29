/**
 * Central site configuration — single source of truth for SEO, metadata,
 * structured data and contact details. Keep it typed and serialisable.
 */

export const siteConfig = {
  name: "Denta",
  legalName: "Denta Dental Studio",
  tagline: "Modern Care for a Perfect Smile",
  description:
    "Denta is a boutique dental studio in Barcelona practising implantology, porcelain veneers and invisible aligners with the precision of fine craft.",
  // Update to the real production origin before deploy (used for canonical + OG).
  url: "https://denta.studio",
  locale: "en_GB",
  email: "hello@denta.studio",
  phone: "+34 931 23 45 67",
  address: {
    street: "24 Passeig de Gràcia",
    city: "Barcelona",
    region: "Catalonia",
    postalCode: "08007",
    country: "ES",
  },
  geo: { lat: 41.3917, lng: 2.1649 },
  openingHours: "Mo-Fr 08:30-18:00",
  founded: "2009",
  social: {
    instagram: "https://instagram.com/denta.studio",
    linkedin: "https://www.linkedin.com/company/denta-studio",
  },
} as const;

export type SiteConfig = typeof siteConfig;
