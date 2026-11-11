"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Fixed contact shortcuts: bottom corner at every screen size, with safe-area spacing.
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
  const t = useTranslations("StickyContact");
  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] end-1 z-40 flex flex-col gap-2 ltr:end-[max(0.25rem,env(safe-area-inset-right))] rtl:end-[max(0.25rem,env(safe-area-inset-left))] md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:gap-3 md:ltr:end-[max(1.5rem,env(safe-area-inset-right))] md:rtl:end-[max(1.5rem,env(safe-area-inset-left))]">
      {/* WhatsApp — solid brand green, matches header's WhatsApp button intent */}
      <a
        href="https://wa.me/971544995924"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappLabel")}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 hover:bg-primary-hover hover:shadow-xl active:scale-95 md:h-14 md:w-14"
      >
        <MessageCircle className="h-[22px] w-[22px] md:h-7 md:w-7" />
        <span className="absolute end-14 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap md:end-16">
          {t("whatsappTooltip")}
        </span>
      </a>

      {/* Call — gold accent, mirrors the header's gold "Call" button */}
      <a
        href="tel:+971544995924"
        aria-label={t("callLabel")}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 transition-all duration-300 hover:scale-110 hover:bg-secondary-hover hover:shadow-xl active:scale-95 md:h-14 md:w-14"
      >
        <Phone className="h-5 w-5 md:h-6 md:w-6" />
        <span className="absolute end-14 hidden rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap md:end-16">
          {t("callTooltip")}
        </span>
      </a>
    </div>
  );
}
