"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { ImageContent, IconContent } from "./types";
import { staggerContainer, fadeIn, slideUp, duration, easing } from "@/lib/motion";

export interface AboutHighlight {
  icon: IconContent;
  label: string;
}

export interface AboutContent {
  id?: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  mission: { title: string; description: string };
  vision: { title: string; description: string };
  image?: ImageContent;
  highlights?: AboutHighlight[];
  founderQuote?: {
    quote: string;
    author: string;
    role?: string;
  };
  animate?: boolean;
}

export function About({
  id,
  eyebrow,
  title,
  paragraphs,
  mission,
  vision,
  image,
  highlights,
  founderQuote,
  animate = true, // Defaulted to true to match Hero styling
}: AboutContent) {
  const TextWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      {/* 1. Soft Gradient Background Continuation */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)] opacity-40" />
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary opacity-[0.04] blur-3xl" />
      </div>

      <Section id={id} className="py-xl md:py-2xl" align="start">
        {/* 3. lg:items-stretch ensures both columns match heights automatically */}
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 md:gap-2xl lg:items-stretch">
          
          {/* 4. IMAGE COLUMN (Forced to left on Desktop using md:order-1) */}
          <div className="order-2 md:order-1 relative flex w-full h-full items-center justify-center">
            {image && (
              <motion.div
                initial={animate ? { opacity: 0, x: -20 } : undefined}
                whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.slow, ease: easing }}
                className="w-full h-full relative group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full min-h-[400px] object-cover rounded-[2rem] shadow-lg md:aspect-[4/5] lg:aspect-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </motion.div>
            )}

            {highlights && !image && (
              <div className="grid grid-cols-2 gap-4 w-full h-full content-center">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 rounded-[1.5rem] border border-border bg-muted/50 p-md text-start"
                  >
                    <span aria-hidden className="text-primary">{h.icon}</span>
                    <Text variant="small" className="text-foreground font-medium">
                      {h.label}
                    </Text>
                  </div>
                ))}
              </div>
            )}

            {!image && !highlights && (
              <div
                className="flex h-full min-h-[400px] w-full items-center justify-center rounded-[2rem] border-2 border-dashed border-border/60 bg-muted/30"
                aria-hidden
              >
                <Text variant="caption">Founder / Clinic Image Placeholder</Text>
              </div>
            )}
          </div>

          {/* TEXT COLUMN (Forced to right on Desktop using md:order-2) */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" } }
              : {})}
            className="order-1 md:order-2 flex flex-col items-start gap-6 text-start py-4"
          >
            {/* Header Content */}
            <motion.div {...(animate ? { variants: slideUp } : {})} className="space-y-2">
              {eyebrow && (
                <Heading level="h6" className="uppercase tracking-widest text-primary/80 font-bold text-sm">
                  {eyebrow}
                </Heading>
              )}
              <Heading level="h2" className="text-balance text-foreground">
                {title}
              </Heading>
            </motion.div>

            {/* Main Paragraphs */}
            <motion.div {...(animate ? { variants: slideUp } : {})} className="space-y-4">
              {paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body" className="leading-relaxed text-foreground/80">
                  {paragraph}
                </Text>
              ))}
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Card interactive className="p-6 rounded-[1.5rem] border border-border/60 bg-background shadow-sm">
                <Heading level="h5" as="h3" className="mb-2 text-primary">
                  {mission.title}
                </Heading>
                <Text variant="small" className="text-foreground/70 leading-relaxed">
                  {mission.description}
                </Text>
              </Card>
              <Card interactive className="p-6 rounded-[1.5rem] border border-border/60 bg-background shadow-sm">
                <Heading level="h5" as="h3" className="mb-2 text-primary">
                  {vision.title}
                </Heading>
                <Text variant="small" className="text-foreground/70 leading-relaxed">
                  {vision.description}
                </Text>
              </Card>
            </motion.div>

            {/* Founder Quote */}
            {founderQuote && (
              <motion.div
                {...(animate ? { variants: slideUp } : {})}
                className="relative mt-4 w-full rounded-[2rem] border border-blue-100 bg-[#eff6ff] p-6 sm:p-8 text-start shadow-sm"
              >
                <Quote size={32} className="mb-4 text-blue-400 opacity-60" aria-hidden />
                <Text variant="body" className="italic leading-relaxed text-blue-900/90 font-medium">
                  "{founderQuote.quote}"
                </Text>
                <div className="mt-5">
                  <Text variant="small" className="font-bold text-blue-900">
                    {founderQuote.author}
                  </Text>
                  {founderQuote.role && (
                    <Text variant="caption" className="mt-1 block font-semibold uppercase tracking-wider text-blue-700/70">
                      {founderQuote.role}
                    </Text>
                  )}
                </div>
              </motion.div>
            )}
          </TextWrapper>
        </div>
      </Section>
    </div>
  );
}