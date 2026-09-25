import { setRequestLocale } from "next-intl/server";

import {
  Hero,
  About,
  Services,
  RequiredDocuments,
  Results24h,
  Facilities,
  FAQ,
  Contact,
  Footer,
} from "@/components/sections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering for next-intl
  setRequestLocale(locale);

  return (
    <main className="relative z-0 min-h-screen pt-20 overflow-hidden">
      <Hero animate />
      <About id="about" animate />
      <Services id="services" animate />
      <RequiredDocuments id="documents" animate />
      <Results24h id="results" animate />
      <Facilities id="facilities" animate />
      <FAQ id="faq" animate />
      <Contact id="contact" animate />
      <Footer />
    </main>
  );
}