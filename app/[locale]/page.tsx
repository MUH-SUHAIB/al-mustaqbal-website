import type { Metadata } from "next";
import {
  Hero,
  About,
  Services,
  Doctors,
  Facilities,
  Testimonials,
  Insurance,
  FAQ,
  Contact,
  Footer,
} from "@/components/sections";
import {
  heroContent,
  aboutContent,
  servicesContent,
  doctorsContent,
  facilitiesContent,
  testimonialsContent,
  insuranceContent,
  faqContent,
  contactContent,
  footerContent,
} from "@/lib/mock-data/homepage";

// Per-page metadata override — the root [locale] layout sets sane defaults;
// this page can refine title/description once real clinic copy exists.
export const metadata: Metadata = {
  title: "Clinic Name — Compassionate Family Healthcare",
  description:
    "Modern diagnostics, calm consultations, and a team that treats you like family. Book your appointment today.",
};

/**
 * Homepage — built entirely by assembling reusable section templates with
 * content data. No section receives hardcoded copy or business logic here;
 * all content lives in `lib/mock-data/homepage.tsx` and should be replaced
 * with real per-clinic content (ideally sourced from next-intl messages or
 * a CMS) before shipping a specific clinic's site.
 */
export default function HomePage() {
  return (
    <main>
      <Hero {...heroContent} animate />
      <About {...aboutContent} id="about" animate />
      <Services {...servicesContent} id="services" animate />
      <Doctors {...doctorsContent} id="doctors" animate />
      <Facilities {...facilitiesContent} id="facilities" animate />
      <Testimonials {...testimonialsContent} id="testimonials" animate />
      <Insurance {...insuranceContent} id="insurance" animate />
      <FAQ {...faqContent} id="faq" animate />
      <Contact {...contactContent} id="contact" animate />
      <Footer {...footerContent} />
    </main>
  );
}
