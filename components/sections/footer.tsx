import Link from "next/link";
import { MapPin, Phone, MessageCircle } from "lucide-react";

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
    <footer className="bg-slate-900 text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-bold text-white text-xl tracking-tight">
                Al Mustaqbal
              </span>
              <span className="text-sm text-blue-400 font-medium tracking-wide">
                Medical Fitness Center
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info with Live Map Link */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Contact Information</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="bg-slate-800 p-2 rounded-full text-blue-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  {phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <div className="bg-slate-800 p-2 rounded-full text-[#25D366]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  {whatsapp} (WhatsApp)
                </a>
              </li>
              <li>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                  <div className="bg-slate-800 p-2 rounded-full text-red-400 mt-0.5 group-hover:bg-red-500/20 group-hover:text-red-300 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    {address.map((line, idx) => (
                      <span key={idx}>{line}</span>
                    ))}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}