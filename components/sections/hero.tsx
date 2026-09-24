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
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(201,168,96,0.1),var(--color-background)_65%)]" />
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-primary opacity-5 blur-3xl" />
      </div>

      <Section className="pt-xl md:pt-2xl pb-16" align="start">
        <div className="grid grid-cols-1 items-center gap-xl md:grid-cols-2 md:gap-2xl lg:items-stretch">
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
              : {})}
            className="order-2 flex flex-col items-center gap-5 text-center md:order-1 md:items-start md:text-start md:py-8 lg:py-12"
          >
            {badge && (
              <motion.div {...(animate ? { variants: fadeIn } : {})}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-secondary" aria-hidden />
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Heading level="h1" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {headline}
              </Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Text variant="body" className="max-w-md text-lg font-medium text-primary">
                {subtitle}
              </Text>
            </motion.div>

            {description && (
              <motion.div {...(animate ? { variants: slideUp } : {})}>
                <Text variant="small" className="max-w-md text-muted-foreground leading-relaxed">
                  {description}
                </Text>
              </motion.div>
            )}

            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:w-auto md:justify-start"
            >
              <Button
                variant={primaryCta.variant ?? "primary"}
                size="lg"
                icon={primaryCta.icon}
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-8 !rounded-full !font-semibold !text-base shadow-elevated hover:-translate-y-0.5 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setBookingOpen(true)}
              >
                {primaryCta.label}
              </Button>

              <LinkButton
                href={secondaryCta.href}
                variant={secondaryCta.variant ?? "outline"}
                size="lg"
                icon={secondaryCta.icon}
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-8 !bg-[#25D366] !text-white hover:!bg-[#20bd5a] !border-none !rounded-full !font-semibold !text-base shadow-subtle hover:-translate-y-0.5 transition-transform"
              >
                {secondaryCta.label}
              </LinkButton>
            </motion.div>
          </TextWrapper>

          <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: duration.slow, ease: easing }}
            className="relative order-1 md:order-2 flex w-full h-full items-center justify-center"
          >
            <div className="w-full relative group rounded-section border border-border shadow-elevated overflow-hidden aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5] max-h-[520px] bg-card">
              <img
                src={resolvedImage.src}
                alt={resolvedImage.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      <AppointmentModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}