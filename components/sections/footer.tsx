import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";

interface FooterProps {
  clinicName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  address: string[];
  quickLinks: { label: string; href: string }[];
  googleMapsUrl?: string;
  copyright: string;
}

export default function Footer({
  clinicName,
  tagline,
  phone,
  whatsapp,
  address,
  quickLinks,
  googleMapsUrl = "#",
  copyright,
}: FooterProps) {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Subtle Background Depth */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative z-10 container mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-4 lg:pr-8">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-white text-2xl tracking-tight">
                Al Mustaqbal
              </span>
              <span className="text-sm text-secondary font-bold tracking-widest uppercase">
                Medical Fitness Center
              </span>
            </div>
            <Text variant="small" className="text-primary-foreground/70 leading-relaxed mt-2">
              {tagline}
            </Text>
          </div>

          {/* Quick Links */}
          <div>
            <Heading level="h6" className="text-white font-bold mb-6 tracking-wide">
              Quick Links
            </Heading>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm font-medium text-primary-foreground/70 hover:text-secondary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info with Live Map Link */}
          <div className="lg:col-span-2">
            <Heading level="h6" className="text-white font-bold mb-6 tracking-wide">
              Contact Information
            </Heading>
            <ul className="flex flex-col gap-5">
              <li>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  {phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  {whatsapp} (WhatsApp)
                </a>
              </li>
              <li>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors group w-fit">
                  <div className="bg-white/10 p-2.5 rounded-full text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-1 leading-relaxed">
                    {address.map((line, idx) => (
                      <span key={idx}>{line}</span>
                    ))}
                    <span className="text-secondary text-xs font-bold uppercase tracking-wider mt-1 group-hover:underline">
                      Get Directions ↗
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text variant="caption" className="text-primary-foreground/50 text-center md:text-left font-medium">
            {copyright}
          </Text>
        </div>
      </div>
    </footer>
  );
}