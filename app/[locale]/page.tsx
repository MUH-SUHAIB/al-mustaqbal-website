import type { Metadata } from "next";
 


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

import {
  heroContent,
  aboutContent,
  servicesContent,
  requiredDocumentsContent,
  results24hContent,
  facilitiesContent,
  faqContent,
  contactContent,
  footerContent,
} from "@/lib/mock-data/homepage";

export const metadata: Metadata = {
  title:
    "Al Mustaqbal Medical Fitness Examination Center | Al Madam, Sharjah",
  description:
    "Accredited medical fitness and visa screening services, occupational health examinations, and vaccinations in Al Madam, Sharjah.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen pt-20">
      <Hero {...heroContent} animate />

      <About
        {...aboutContent}
        id="about"
        animate
      />

      <Services
        {...servicesContent}
        id="services"
        animate
      />

      <RequiredDocuments 
        {...requiredDocumentsContent} 
        id="documents" 
        animate 
      />



<Results24h
  {...results24hContent}
  id="results"
  animate
/>



      <Facilities
        {...facilitiesContent}
        id="facilities"
        animate
      />

      <FAQ
        {...faqContent}
        id="faq"
        animate
      />

      <Contact
        {...contactContent}
        id="contact"
        animate
      />

      <Footer {...footerContent} />
    </main>
  );
}