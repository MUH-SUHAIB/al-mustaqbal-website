"use client";

import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Heading, Text } from "@/components/ui/typography";

// Globally constant business details
const PHONE = "+971 54 499 5924";
const WHATSAPP = "+971 54 499 5924";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84+%D9%84%D9%84%D9%8A%D8%A7%D9%84%D9%82%D8%A9+%D8%A7%D8%B7%D8%A8%D9%8A%D8%A9%E2%80%AD/@24.9147795,55.775558,17z/data=!4m6!3m5!1s0x3ef575000d86e721:0xa1486a7754c5f16c!8m2!3d24.914767!4d55.7755581!16s%2Fg%2F11m5llqxx1?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D";

export function Footer() {
  const t = useTranslations("Footer");
  
  // Extract arrays from JSON
  const quickLinks = t.raw("quickLinks") as { label: string; href: string }[];
  const addressLines = t.raw("addressLines") as string[];

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle Background Depth */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-40 -end-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative z-10 container mx-auto px-6 md:px-8 py-16 md:py-20 text-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-4 lg:pe-8">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-white text-2xl tracking-tight">
                {t("clinicName")}
              </span>
              <span className="text-sm text-secondary font-bold tracking-widest uppercase">
                {t("clinicType")}
              </span>
            </div>
            <Text variant="small" className="text-primary-foreground/70 leading-relaxed mt-2">
              {t("tagline")}
            </Text>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level="h6" className="text-white font-bold mb-6 tracking-wide">
              {t("quickLinksTitle")}
            </Heading>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm font-medium text-primary-foreground/70 hover:text-secondary rtl:hover:-translate-x-1 ltr:hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <Heading level="h6" className="text-white font-bold mb-6 tracking-wide">
              {t("contactTitle")}
            </Heading>
            <ul className="flex flex-col gap-5">
              <li>
                <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span dir="ltr" className="inline-block">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span dir="ltr" className="inline-block">{WHATSAPP}</span> {t("whatsappText")}
                </a>
              </li>
              <li>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-1 leading-relaxed">
                    {addressLines.map((line, idx) => (
                      <span key={idx}>{line}</span>
                    ))}
                    <span className="text-secondary text-xs font-bold uppercase tracking-wider mt-1 group-hover:underline flex items-center gap-1">
                      {t("getDirections")}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text variant="caption" className="text-primary-foreground/50 text-center md:text-start font-medium w-full">
            {t("copyright")}
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;