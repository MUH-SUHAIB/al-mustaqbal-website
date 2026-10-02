import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://almustaqbalmedical.ae";
  const lastModified = new Date();

  // Define language alternates reused across entries
  const languageAlternates = {
    languages: {
      en: `${baseUrl}/en`,
      ar: `${baseUrl}/ar`,
      "x-default": `${baseUrl}/en`, // Redirects/defaults unhandled languages to English
    },
  };

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: languageAlternates,
    },
  ];
}