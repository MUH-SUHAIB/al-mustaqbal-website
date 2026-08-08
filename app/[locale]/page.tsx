import type { Metadata } from "next";
import Header from "@/components/sections/header";

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

export const metadata: Metadata = {
  title: "Baghdad Medical Center — Compassionate Family Healthcare in Al Madam",
  description:
    "Modern diagnostics, calm consultations, and expert doctors in Sharjah. Book your appointment with Baghdad Medical Center today.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
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