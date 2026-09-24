"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContactProps {
  title: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: { days: string; hours: string }[];
  mapEmbedSrc: string;
  googleMapsUrl?: string;
  id?: string;
  animate?: boolean;
}

export default function Contact({
  title,
  description,
  phone,
  whatsapp,
  address,
  workingHours,
  mapEmbedSrc,
  googleMapsUrl = "#",
  id = "contact",
  animate = true,
}: ContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsOpen = () => {
      // Get current local time in UAE
      const uaeTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" });
      const date = new Date(uaeTime);
      const day = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
      const hours = date.getHours(); // 0-23 format

      // Friday (5) is Closed
      if (day === 5) {
        setIsOpen(false);
      } else {
        // Open 8:00 AM (8) to 2:00 PM (14)
        if (hours >= 8 && hours < 14) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    };

    checkIsOpen();
    const interval = setInterval(checkIsOpen, 60000); // Re-check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-background">
      <Section id={id} className="py-20 md:py-28">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16 gap-4">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </Heading>
          {description && (
            <Text variant="body" className="text-muted-foreground text-lg text-balance">
              {description}
            </Text>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
          
          {/* Left Column: Info Cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            
            {/* Contact Numbers */}
            <Card interactive={false} className="p-6 md:p-8 flex flex-col gap-5 border border-border/60 shadow-subtle bg-card rounded-card">
              <div className="flex items-center gap-2 text-secondary text-sm font-bold uppercase tracking-wider">
                <Phone className="w-5 h-5" /> Contact Center
              </div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 px-4 rounded-xl font-semibold hover:-translate-y-0.5 transition-transform shadow-sm hover:shadow-primary/20">
                  <Phone className="w-5 h-5" /> Call {phone}
                </a>
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-4 rounded-xl font-semibold hover:-translate-y-0.5 transition-transform shadow-sm hover:shadow-[#25D366]/20">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Message
                </a>
              </div>
            </Card>

            {/* Location */}
            <Card interactive={false} className="p-6 md:p-8 flex flex-col gap-4 border border-border/60 shadow-subtle bg-card rounded-card">
              <div className="flex items-center gap-2 text-secondary text-sm font-bold uppercase tracking-wider">
                <MapPin className="w-5 h-5" /> Our Location
              </div>
              <Text variant="body" className="text-foreground font-medium text-lg leading-snug">
                {address}
              </Text>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-bold flex items-center gap-1.5 hover:opacity-80 transition-opacity w-fit mt-1">
                Get Directions <ExternalLink className="w-4 h-4" />
              </a>
            </Card>

            {/* Working Hours with Dynamic Badge */}
            <Card interactive={false} className="p-6 md:p-8 flex flex-col gap-5 border border-border/60 shadow-subtle bg-card rounded-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary text-sm font-bold uppercase tracking-wider">
                  <Clock className="w-5 h-5" /> Working Hours
                </div>
                {mounted && (
                  <span className={cn(
                    "text-xs font-bold px-3 py-1.5 rounded-full border",
                    isOpen 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-red-50 text-red-700 border-red-200"
                  )}>
                    {isOpen ? "Open Now" : "Closed"}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 mt-1">
                {workingHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border/40 pb-2 last:border-0 last:pb-0">
                    <span className="text-muted-foreground font-medium">{item.days}</span>
                    <span className="text-foreground font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-2 relative bg-card rounded-[1.5rem] overflow-hidden shadow-subtle h-[500px] lg:h-auto border border-border/60 group">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
            
            {/* Open in Google Maps Centered Badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-card text-foreground px-6 py-3.5 rounded-full font-bold shadow-elevated hover:-translate-y-1 transition-all text-sm sm:text-base border border-border whitespace-nowrap"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z"
                    fill="#A50E0E"
                  />
                </svg>
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}