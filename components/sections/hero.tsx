"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Button, LinkButton } from "@/components/ui/button";
import { AppointmentModal } from "./appointment-modal";
import type { CTAContent, ImageContent } from "./types";
import { staggerContainer, fadeIn, slideUp, duration, easing } from "@/lib/motion";

export interface HeroContent {
  /** Main headline — keep to one short, confident line. Rendered as the page's <h1>. */
  headline: string;
  /** Supporting line directly under the headline (e.g. "Founder, Dr. Sara Ahmed — Board Certified Cardiologist"). */
  subtitle: string;
  /** Optional short supporting sentence below the subtitle. Keep to one sentence. */
  description?: string;
  /** Call Now — always rendered as the visually dominant CTA. Pass an `href="tel:+..."`. */
  primaryCta: CTAContent;
  /** WhatsApp — always rendered as the second CTA. Pass an `href="https://wa.me/..."`. */
  secondaryCta: CTAContent;
  /** Doctor / clinic founder photo. Pass a plain src string, or `{ src, alt }` for custom alt text. */
  image: string | ImageContent;
  /** Optional trust pill above the headline, e.g. "24/7 Care" or "Trusted Medical Center". */
  badge?: string;
  /** Plays the load-in animation (fade/slide/scale). Defaults to true — this is the first thing a visitor sees. */
  animate?: boolean;
}

function normalizeImage(image: string | ImageContent, fallbackAlt: string): ImageContent {
  return typeof image === "string" ? { src: image, alt: fallbackAlt } : image;
}

/**
 * HERO SECTION
 *
 * CONVERSION GOAL (primary): get the visitor to tap Call or WhatsApp before
 * they scroll. Both CTAs render via `LinkButton` (real <a> elements, not a
 * <button> wrapping a link) — Call Now as the dominant `primary` variant,
 * WhatsApp as an `outline` variant right beside it. Both are full-width and
 * stacked on mobile for maximum tap-target size; row-aligned on desktop.
 *
 * TRUST GOAL (secondary): optional badge pill + subtitle (founder/doctor
 * credibility line) sit directly above/below the headline, and the visual
 * column carries a soft glow + gentle scale-in — calm, not flashy.
 *
 * LAYOUT
 * Mobile (< md):  image → headline block → CTAs, single column, text and
 *                 CTAs centered, buttons full-width and stacked for large
 *                 tap targets.
 * Desktop (md+):  2-column grid — text (start side) | image (end side),
 *                 text goes back to natural start-alignment, CTAs sit in
 *                 a row. Because this is a CSS grid with the browser's own
 *                 direction handling (not hardcoded left/right), the
 *                 columns swap sides automatically under dir="rtl" — no
 *                 separate Arabic layout is written.
 *
 * BACKGROUND
 * A blue → background gradient plus two blurred "mesh" circles sit behind
 * the content in a `-z-10` layer, and a soft glow sits behind the image.
 * All colors come from design tokens (--color-primary/secondary/background)
 * — nothing is hardcoded, so this reskins automatically per clinic.
 *
 * RTL
 * No manual Arabic layout: text alignment uses `text-center`/`md:text-start`
 * (never `text-left`), the CTA row uses `md:justify-start` (flex's logical
 * start, which sits on the right under RTL automatically), and the mesh
 * shapes use `start-*`/`end-*` instead of `left-*`/`right-*` so they mirror
 * too. The grid column order mirrors natively because grid track direction
 * follows `dir` on the ancestor <html>.
 */
export function Hero({
  headline,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  badge,
  animate = true,
}: HeroContent) {
  const resolvedImage = normalizeImage(image, `${headline} — clinic doctor`);
  const TextWrapper = animate ? motion.div : "div";
  const [isBookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background — gradient + mesh shapes. Purely visual: aria-hidden, no interactive content. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-secondary),var(--color-background)_65%)]" />
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />
        <div className="absolute -end-16 top-1/3 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <Section className="pt-xl md:pt-2xl" align="start">
        <div className="grid grid-cols-1 items-center gap-xl md:grid-cols-2 md:gap-2xl">
          {/* Text column — order-2 on mobile so the image (trust signal) shows first */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
              : {})}
            className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-start"
          >
            {badge && (
              <motion.div {...(animate ? { variants: fadeIn } : {})}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground shadow-subtle">
                  <ShieldCheck size={16} aria-hidden />
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Heading level="h1">{headline}</Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Text variant="body" className="max-w-md font-medium text-primary">
                {subtitle}
              </Text>
            </motion.div>

            {description && (
              <motion.div {...(animate ? { variants: slideUp } : {})}>
                <Text variant="small" className="max-w-md">
                  {description}
                </Text>
              </motion.div>
            )}

            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-2 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row md:justify-start"
            >
              <Button
                variant={primaryCta.variant ?? "primary"}
                size="lg"
                icon={primaryCta.icon}
                fullWidth
                className="md:w-auto"
                onClick={() => setBookingOpen(true)}
              >
                {primaryCta.label}
              </Button>
              <LinkButton
                href={secondaryCta.href}
                variant={secondaryCta.variant ?? "outline"}
                size="lg"
                icon={secondaryCta.icon}
                fullWidth
                className="md:w-auto"
              >
                {secondaryCta.label}
              </LinkButton>
            </motion.div>
          </TextWrapper>

          {/* Visual column — order-1 on mobile (image first) */}
          <motion.div
            initial={animate ? { opacity: 0, scale: 1.06 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: duration.slow, ease: easing }}
            className="relative order-1 md:order-2"
          >
            {/* Soft glow behind the doctor image */}
            <div
              className="absolute inset-4 -z-10 rounded-section bg-primary opacity-20 blur-2xl"
              aria-hidden
            />
            <img
              src={resolvedImage.src}
              alt={resolvedImage.alt}
              className="aspect-[4/5] w-full rounded-section object-cover shadow-elevated md:aspect-square"
            />
          </motion.div>
        </div>
      </Section>

      <AppointmentModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
