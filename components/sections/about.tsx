"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { ImageContent, IconContent } from "./types";
import { staggerContainer, slideUp, duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
  animate = true,
}: AboutContent) {
  const TextWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      {/* Symmetric fade background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
      </div>

      <Section id={id} className="py-xl md:py-2xl" align="start">
        {/* md:items-stretch forces both columns to equal height */}
        <div className="grid grid-cols-1 gap-xl md:grid-cols-2 md:gap-2xl md:items-stretch">
          {/* IMAGE + QUOTE COLUMN */}
          <div className="order-2 flex w-full md:order-1">
            {image ? (
              <motion.div
                initial={animate ? { opacity: 0, y: 24 } : undefined}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.slow, ease: easing }}
                // Added glowing shadow classes and hover interactive shadow behavior
                className={cn(
                  "group flex w-full flex-col overflow-hidden rounded-section border border-border bg-background shadow-subtle transition-shadow duration-300 ease-in-out",
                  "drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.2)]"
                )}
              >
                {/* min-h-[280px] on mobile prevents collapse; md:min-h-0 allows grid stretch */}
                <div className="relative min-h-[280px] flex-1 md:min-h-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {founderQuote && (
                  <div className="border-t border-border bg-secondary p-5 text-start sm:p-6">
                    <Quote size={22} className="text-primary opacity-60" aria-hidden />
                    <Text variant="small" className="mt-2 italic text-secondary-foreground">
                      “{founderQuote.quote}”
                    </Text>
                    <div className="mt-3">
                      <Text variant="small" className="font-semibold text-secondary-foreground">
                        {founderQuote.author}
                      </Text>
                      {founderQuote.role && <Text variant="caption">{founderQuote.role}</Text>}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : highlights ? (
              <div className="grid w-full grid-cols-2 content-start gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 rounded-card border border-border bg-muted p-md text-start"
                  >
                    <span aria-hidden className="text-primary">
                      {h.icon}
                    </span>
                    <Text variant="small" className="font-medium text-foreground">
                      {h.label}
                    </Text>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex min-h-[400px] w-full items-center justify-center rounded-section border border-dashed border-border bg-muted"
                aria-hidden
              >
                <Text variant="caption">Founder / Clinic Image</Text>
              </div>
            )}
          </div>

          {/* TEXT COLUMN */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" } }
              : {})}
            className="order-1 flex flex-col items-start gap-6 text-start md:order-2 md:py-4"
          >
            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-2">
              {eyebrow && <Heading level="h6">{eyebrow}</Heading>}
              <Heading level="h2" className="text-foreground">
                {title}
              </Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-4">
              {paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body">
                  {paragraph}
                </Text>
              ))}
            </motion.div>

            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Card interactive className="p-md">
                <Heading level="h5" as="h3" className="text-primary">
                  {mission.title}
                </Heading>
                <Text variant="small" className="mt-1">
                  {mission.description}
                </Text>
              </Card>
              <Card interactive className="p-md">
                <Heading level="h5" as="h3" className="text-primary">
                  {vision.title}
                </Heading>
                <Text variant="small" className="mt-1">
                  {vision.description}
                </Text>
              </Card>
            </motion.div>
          </TextWrapper>
        </div>
      </Section>
    </div>
  );
}