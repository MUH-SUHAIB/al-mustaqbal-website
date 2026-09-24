import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing, getDirection, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/sections/header";
import { StickyContactButtons } from "@/components/ui/sticky-contact-buttons";

import "../../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Al Mustaqbal Medical Fitness Examination Center | Al Madam, Sharjah",
  description: "Accredited medical fitness and visa screening services, occupational health examinations, and vaccinations in Al Madam, Sharjah.",
  robots: { index: true, follow: true },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getDirection(locale as Locale);

  // Local SEO Schema for Google Business Profile
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Al Mustaqbal Medical Fitness Examination Center",
    "alternateName": "مركز المستقبل لفحص اللياقة الطبية",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Madam Roundabout, next to First Abu Dhabi Bank (FAB)",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "telephone": "+971544995924",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${dir === 'rtl' ? ibmPlexArabic.variable : inter.variable} font-sans antialiased bg-background text-foreground bg-sharjah-pattern`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
            <StickyContactButtons />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}