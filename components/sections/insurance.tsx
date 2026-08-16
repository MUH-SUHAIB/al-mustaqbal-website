"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface InsuranceLogo {
  /** Logo image src. Omit to render a placeholder tile with `alt` as the label — useful before real logos are supplied. */
  src?: string;
  /** Insurer name — used as alt text when `src` is provided, and as the visible label when it isn't. */
  alt: string;
}

export interface InsuranceContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "insurance". */
  id?: string;
  eyebrow?: string;
  title: string;
  /** Short supporting line above the grid, e.g. "We work with all major providers." */
  description?: string;
  logos: InsuranceLogo[];
  animate?: boolean;
}

function LogoCard({ logo, animate }: { logo: InsuranceLogo; animate: boolean }) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div {...(animate ? { variants: slideUp } : {})} className="h-full">
      <Card className="group flex h-32 items-center justify-center border-2 p-6 transition-colors duration-base hover:border-primary sm:h-36 sm:p-8">
        {logo.src && !hasError ? (
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className="max-h-14 w-auto max-w-full object-contain transition-transform duration-base group-hover:scale-105 sm:max-h-16"
          />
        ) : (
          <Text variant="small" className="text-center font-medium text-foreground">
            {logo.alt}
          </Text>
        )}
      </Card>
    </motion.div>
  );
}

/**
 * LAYOUT
 * Mobile:  2 columns.
 * Tablet:  3 columns.
 * Desktop: 5 columns.
 * Fewer, larger columns than a dense logo strip — each card gets real
 * breathing room (h-32/h-36, generous padding) instead of being crammed,
 * which is what reads as "premium" vs. "logo soup."
 *
 * DESIGN
 * - Built on the shared `Card` component, so hover lift + shadow is
 *   identical to Services/Doctors/Facilities — one consistent hover
 *   language across the whole site, not a one-off effect.
 * - `border-2 hover:border-primary` gives a visible, deliberate border
 *   accent on hover (not just a shadow), plus a slight logo scale-up
 *   (`group-hover:scale-105`) — two small, coordinated hover cues rather
 *   than one big flashy one.
 * - Logos render in full color at rest — no grayscale filter — since a
 *   dulled resting state reads as less trustworthy for a healthcare
 *   audience; the hover treatment communicates interactivity instead.
 * - Cards reveal via the existing `staggerContainer`/`slideUp` variants,
 *   same pattern as Doctors/Facilities/Testimonials, so the reveal
 *   timing is consistent site-wide rather than a new animation system.
 *
 * FALLBACK
 * `onError` swaps a broken image for the insurer's name in the same
 * card shape — the grid never looks broken even if an asset 404s.
 */
export function Insurance({ id, eyebrow, title, description, logos, animate = false }: InsuranceContent) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <motion.div
        {...(animate
          ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } }
          : {})}
        className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8"
      >
        {logos.map((logo, i) => (
          <LogoCard key={i} logo={logo} animate={animate} />
        ))}
      </motion.div>
    </Section>
  );
}