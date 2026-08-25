import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing, getDirection, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/sections/header";
import { StickyContactButtons } from "@/components/ui/sticky-contact-buttons";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Al Mustaqbal Medical Fitness Examination Center | Al Madam, Sharjah",
  description:
    "Accredited medical fitness and visa screening services, occupational health examinations, and vaccinations in Al Madam, Sharjah.",
  robots: {
    index: true,
    follow: true,
  },
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

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
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