import { Phone, Mail, MapPin } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import type { ImageContent, IconContent } from "./types";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: IconContent;
}

export interface FooterContent {
  clinicName: string;
  /** Optional logo image, rendered above the clinic name. The clinic name always renders underneath it. */
  logo?: ImageContent;
  /** Short one-line description under the clinic name. Optional. */
  tagline?: string;
  quickLinks: FooterLink[];
  /** Landline number, displayed as-is. */
  phone?: string;
  /** International tel: destination for the landline. Falls back to `phone` if omitted. */
  phoneHref?: string;
  /** Optional second call number (mobile), displayed as-is. */
  mobile?: string;
  /** International tel: destination for the mobile number. Falls back to `mobile` if omitted. */
  mobileHref?: string;
  email?: string;
  /** Address as separate lines, rendered stacked (e.g. ["Al Madam, Sharjah", "FAB Building", "Side Entrance", "First Floor"]). */
  address?: string[];
  /** Optional social icon links (Instagram, Facebook, etc). Rendered as a small icon row. */
  socialLinks?: FooterSocialLink[];
  /** Pre-formatted copyright line, e.g. "© 2026 Clinic Name. All rights reserved." */
  copyright: string;
}

/**
 * LAYOUT
 * Mobile:  stacked single column.
 * Tablet:  2 columns.
 * Desktop: 4 columns — clinic info | quick links | contact | follow us —
 *          then a full-width bottom bar (copyright only) divided by a
 *          border-top.
 *
 * DESIGN RULES
 * - Uses `bg-muted` (a token), never a hardcoded dark footer color, so
 *   footer contrast follows light/dark mode automatically.
 * - No animation — footers should be the calmest part of the page.
 * - RTL: every row is a `flex` with icon-then-text order and `text-start`,
 *   which mirrors automatically under dir="rtl" — no directional classes.
 * - Branding column always shows the clinic name; the logo (if provided)
 *   renders above it rather than replacing it, for stronger branding.
 *
 * USAGE NOTES
 * - `logo`, `mobile`, and `socialLinks` are all optional — omit any of
 *   them for a simpler footer on smaller clinic sites.
 */
export function Footer({
  clinicName,
  logo,
  tagline,
  quickLinks,
  phone,
  phoneHref,
  mobile,
  mobileHref,
  email,
  address,
  socialLinks,
  copyright,
}: FooterContent) {
  return (
    <footer className="bg-muted">
      <div className="mx-auto max-w-7xl px-md py-2xl md:px-lg">
        <div className="grid grid-cols-1 gap-xl text-start sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            {logo && (
              <img src={logo.src} alt={logo.alt} loading="lazy" className="h-14 w-auto object-contain" />
            )}
            <Heading level="h5" as="h3">
              {clinicName}
            </Heading>
            {tagline && <Text variant="small">{tagline}</Text>}
          </div>

          <nav aria-label="Quick links" className="flex flex-col gap-2">
            <Heading level="h6">Quick Links</Heading>
            {quickLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-foreground transition-colors duration-fast hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <Heading level="h6">Contact</Heading>
            {phone && (
              <a
                href={`tel:${phoneHref ?? phone}`}
                className="flex items-center gap-2 text-sm text-foreground transition-colors duration-fast hover:text-primary"
              >
                <Phone size={16} aria-hidden /> {phone}
              </a>
            )}
            {mobile && (
              <a
                href={`tel:${mobileHref ?? mobile}`}
                className="flex items-center gap-2 text-sm text-foreground transition-colors duration-fast hover:text-primary"
              >
                <Phone size={16} aria-hidden /> {mobile}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-foreground transition-colors duration-fast hover:text-primary"
              >
                <Mail size={16} aria-hidden /> {email}
              </a>
            )}
            {address && address.length > 0 && (
              <span className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span className="flex flex-col">
                  {address.map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Heading level="h6">Follow Us</Heading>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-fast hover:border-primary hover:text-primary"
                  >
                    <span aria-hidden>{social.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-xl flex items-center justify-center border-t border-border pt-6 text-center">
          <Text variant="caption">{copyright}</Text>
        </div>
      </div>
    </footer>
  );
}
