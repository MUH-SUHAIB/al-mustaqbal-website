"use client";

import { MessageCircle, Phone } from "lucide-react";

/**
 * Fixed floating action buttons (bottom corner, RTL-aware via `end-6`).
 *
 * Colors were previously hardcoded to WhatsApp's brand green (#25D366) and
 * a generic blue (blue-700) — neither exists in the Al Mustaqbal palette
 * (deep green #1C4B3A / gold #C9A860), so these two buttons visually broke
 * the brand everywhere else on the site already respects. Recolored to use
 * the theme's `primary` (green) and `secondary` (gold) tokens so this
 * component now updates automatically if the brand palette ever changes,
 * instead of needing another manual hex-hunt like this one.
 */
export function StickyContactButtons() {
  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col gap-3">
      {/* WhatsApp — solid brand green, matches header's WhatsApp button intent */}
      <a
        href="https://wa.me/971544995924"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary-hover hover:shadow-xl active:scale-95"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute end-16 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Call — gold accent, mirrors the header's gold "Call" button */}
      <a
        href="tel:+971544995924"
        aria-label="Call Center"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 transition-all duration-300 hover:scale-110 hover:bg-secondary-hover hover:shadow-xl active:scale-95"
      >
        <Phone className="h-6 w-6" />
        <span className="absolute end-16 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap">
          Call Us
        </span>
      </a>
    </div>
  );
}