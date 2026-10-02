import { MetadataRoute } from "next";

/**
 * Sitemap for Al Mustaqbal Medical Fitness Examination Center.
 * BASE_URL uses www because Vercel redirects the non-www domain to it.
 * Keep this identical to BASE_URL in app/[locale]/layout.tsx.
 */
const BASE_URL = "https://www.almustaqbalmedical.ae";
const LAST_UPDATED = new Date("2026-10-02");

export default function sitemap(): MetadataRoute.Sitemap {
  const languageAlternates = {
    languages: {
      en: `${BASE_URL}/en`,
      ar: `${BASE_URL}/ar`,
      "x-default": `${BASE_URL}/en`,
    },
  };

  return [
    {
      url: `${BASE_URL}/en`,
      lastModified: LAST_UPDATED,
      alternates: languageAlternates,
    },
    {
      url: `${BASE_URL}/ar`,
      lastModified: LAST_UPDATED,
      alternates: languageAlternates,
    },
  ];
}