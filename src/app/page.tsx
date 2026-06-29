import { StickyNav } from "@/components/sections/sticky-nav";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Philosophy } from "@/components/sections/philosophy";
import { Doctors } from "@/components/sections/doctors";
import { Treatments } from "@/components/sections/treatments";
import { Technology } from "@/components/sections/technology";
import { BeforeAfter } from "@/components/sections/before-after";
import { Testimonials } from "@/components/sections/testimonials";
import { Booking } from "@/components/sections/booking";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main id="main">
        <span id="top" />
        <Hero />
        <TrustBar />
        <Philosophy />
        <Doctors />
        <Treatments />
        <Technology />
        <BeforeAfter />
        <Testimonials />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
