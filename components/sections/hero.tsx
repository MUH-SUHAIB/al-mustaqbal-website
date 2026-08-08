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
  headline: string;
  subtitle: string;
  description?: string;
  primaryCta: CTAContent;
  secondaryCta: CTAContent;
  image: string | ImageContent;
  badge?: string;
  animate?: boolean;
}

function normalizeImage(image: string | ImageContent, fallbackAlt: string): ImageContent {
  return typeof image === "string" ? { src: image, alt: fallbackAlt } : image;
}

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
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-secondary),var(--color-background)_65%)]" />
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />
        <div className="absolute -end-16 top-1/3 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <Section className="pt-xl md:pt-2xl" align="start">
        <div className="grid grid-cols-1 items-center gap-xl md:grid-cols-2 md:gap-2xl">
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

          <motion.div
            initial={animate ? { opacity: 0, scale: 1.06 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: duration.slow, ease: easing }}
            className="relative order-1 md:order-2"
          >
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