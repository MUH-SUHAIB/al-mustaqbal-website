import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
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

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Dynamic SEO & OpenGraph Metadata based on Locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://almustaqbalmedical.ae";
  const currentUrl = `${baseUrl}/${locale}`;
  const isAr = locale === "ar";

  // Localized Strings for Metadata
  const siteTitle = isAr
    ? "مركز المستقبل لفحص اللياقة الطبية | المدام، الشارقة"
    : "Al Mustaqbal Medical Fitness Examination Center | Al Madam, Sharjah";
    
  const siteDescription = isAr
    ? "المركز المعتمد لفحوصات اللياقة الطبية وتجديد الإقامة في المدام، الشارقة. نتائج سريعة خلال 24 ساعة بأعلى معايير الجودة."
    : "Accredited residency visa medical screening, blood testing, and X-ray services in Al Madam, Sharjah. Results within 24 hours.";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteTitle,
      template: `%s | ${isAr ? "مركز المستقبل" : "Al Mustaqbal Medical"}`,
    },
    description: siteDescription,
    keywords: [
      "Medical Fitness Center Al Madam",
      "Residency Visa Screening Sharjah",
      "Visa Medical Test Al Madam",
      "Medical Examination Center Sharjah",
      "مركز المستقبل لفحص اللياقة الطبية",
      "فحص الطبي للاقامة المدام",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "VaDW1PvlVih8sdcM9PWGES_v-J9AQIhBDIJESVW27fY",
    },
    
    // Wire up Favicons & Manifest from the public folder
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },

    // WhatsApp / Facebook OpenGraph Card
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: currentUrl,
      siteName: siteTitle,
      locale: isAr ? "ar_AE" : "en_AE",
      alternateLocale: isAr ? ["en_AE"] : ["ar_AE"],
      type: "website",
      images: [
        {
          url: "/og-image.jpg", // Ensure this image is directly in your public/ folder
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    
    // Twitter / X Card
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: ["/og-image.jpg"],
    },
    
    // Multilingual SEO Canonical & Alternate hreflang tags
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Native array validation for next-intl v3 compatibility
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getDirection(locale as Locale);

  // Enriched Local Business & Medical Schema for Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Al Mustaqbal Medical Fitness Examination Center",
    "alternateName": "مركز المستقبل لفحص اللياقة الطبية",
    "url": "https://almustaqbalmedical.ae",
    "logo": "https://almustaqbalmedical.ae/favicon-512x512.png", // Updated to use the larger favicon
    "image": "https://almustaqbalmedical.ae/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Madam Roundabout, next to First Abu Dhabi Bank (FAB)",
      "addressLocality": "Al Madam",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "telephone": "+971544995924",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "medicalSpecialty": "Occupational Medicine",
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Residency Visa Medical Screening",
        "alternateName": "فحص اللياقة الطبية للإقامة"
      },
      {
        "@type": "MedicalTest",
        "name": "Blood Testing and Medical X-Ray"
      }
    ]
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
        className={`${cairo.variable} ${inter.variable} font-sans antialiased bg-background text-foreground bg-sharjah-pattern`}
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