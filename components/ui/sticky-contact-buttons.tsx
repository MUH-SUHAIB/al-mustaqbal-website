"use client";

import { MessageCircle, Phone } from "lucide-react";

export function StickyContactButtons() {
  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/971544995924"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-xl active:scale-95"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute end-16 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      <a
        href="tel:+971544995924"
        aria-label="Call Center"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg shadow-blue-700/30 transition-all duration-300 hover:scale-110 hover:bg-blue-800 hover:shadow-xl active:scale-95"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute end-16 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap">
          Call Us
        </span>
      </a>
    </div>
  );
}