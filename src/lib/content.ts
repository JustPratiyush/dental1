/**
 * Typed content model for the homepage. Sections read from here so that copy,
 * imagery and ordering stay declarative and easy to maintain.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Doctor {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Treatment {
  no: string;
  name: string;
  description: string;
}

export interface TechPoint {
  title: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  meta: string;
  accent?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "#treatments" },
  { label: "Implants", href: "#technology" },
  { label: "Price", href: "#booking" },
  { label: "Preventive Care", href: "#philosophy" },
];

export const stats: Stat[] = [
  { value: 14200, suffix: "+", label: "Implants placed" },
  { value: 98, suffix: "%", label: "5-year success" },
  { value: 15, label: "Years of craft" },
  { value: 4900, suffix: "+", label: "Five-star reviews" },
];

export const marqueeItems: string[] = [
  "Implantology",
  "Cosmetic veneers",
  "Invisible aligners",
  "Digital smile design",
  "Sedation comfort",
  "Whitening",
];

export const doctors: Doctor[] = [
  {
    name: "Dr. Elena Marchetti",
    role: "Founder · Implant surgeon",
    bio: "Fellow of the ITI. Fifteen years devoted almost entirely to implantology and full-arch rehabilitation.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dr. Julian Voss",
    role: "Cosmetic & restorative",
    bio: "Ceramist-trained. Designs every veneer by hand before a single tooth is touched.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dr. Naomi Adeyemi",
    role: "Orthodontics · Aligners",
    bio: "Specialist in invisible aligner therapy and the quiet mechanics of moving teeth gently.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
  },
];

export const treatments: Treatment[] = [
  {
    no: "01",
    name: "Dental implants",
    description:
      "Single tooth to full arch. Guided, digitally planned, placed with sub-millimetre accuracy.",
  },
  {
    no: "02",
    name: "Porcelain veneers",
    description:
      "Hand-layered ceramics matched to your face — natural translucency, never opaque.",
  },
  {
    no: "03",
    name: "Invisible aligners",
    description:
      "Clear, removable, predictable. A 3D plan you can preview before you start.",
  },
  {
    no: "04",
    name: "Smile design",
    description:
      "A complete cosmetic blueprint — proportion, shade and contour, mocked up first.",
  },
];

export const techPoints: TechPoint[] = [
  { title: "3D CBCT", detail: "Low-radiation volumetric imaging" },
  { title: "Guided surgery", detail: "Patient-specific printed guides" },
  { title: "Intraoral scan", detail: "No putty, no gagging — just light" },
  { title: "Same-day ceramics", detail: "Milled crowns in a single visit" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "I've never had a dentist explain things so calmly. The implant looks and feels like it was always mine.",
    author: "Clara R.",
    meta: "Single implant · 2024",
  },
  {
    quote:
      "It feels more like visiting a design studio than a clinic. And my veneers are flawless.",
    author: "Daniel M.",
    meta: "Porcelain veneers · 2023",
    accent: true,
  },
  {
    quote:
      "Painless, unhurried, genuinely kind. I drive two hours for my appointments and would do it again.",
    author: "Priya N.",
    meta: "Aligners · 2024",
  },
];

export const treatmentOptions = [
  "Dental implants",
  "Porcelain veneers",
  "Invisible aligners",
  "Smile design",
  "Not sure yet",
] as const;
