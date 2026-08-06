import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, getDirection, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Pre-renders /en and /ar at build time (SSG-friendly, SEO-friendly).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Placeholder metadata — override per-clinic in individual page files
// or generate dynamically per-locale with generateMetadata later.
export const metadata: Metadata = {
  title: "Clinic Name",
  description: "Clinic website powered by the reusable clinic website system.",
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

  // Guards against any locale segment outside our supported list
  // (belt-and-suspenders alongside middleware matching).
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale on this request.
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
