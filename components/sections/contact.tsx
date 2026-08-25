"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";

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
    <section id={id} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Info Cards */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            
            {/* Contact Numbers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <Phone className="w-4 h-4" /> Contact Number
              </div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4" /> Call Us
                </a>
                <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Our Location
              </div>
              <p className="text-slate-700 font-medium">{address}</p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors w-fit">
                Get Directions <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Working Hours with Dynamic Badge */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> Working Hours
                </div>
                {mounted && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isOpen ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                    {isOpen ? "Open Now" : "Closed Now"}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {workingHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{item.days}</span>
                    <span className="text-slate-900 font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-2 relative bg-slate-200 rounded-2xl overflow-hidden shadow-sm h-[400px] lg:h-auto border border-slate-200 group">
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white text-slate-800 px-6 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all text-sm border-2 border-slate-300 hover:border-blue-500 whitespace-nowrap"
              >
                {/* Official Google Maps Color Pin */}
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
      </div>
    </section>
  );
}