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
    <div className="relative overflow-hidden bg-card border-y border-border/40">
      <Section id={id} className="py-20 md:py-28" align="start">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 md:items-stretch">
          
          {/* IMAGE + QUOTE COLUMN */}
          <div className="order-2 flex w-full md:order-1">
            {image ? (
              <motion.div
                initial={animate ? { opacity: 0, y: 24 } : undefined}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.slow, ease: easing }}
                className={cn(
                  "group flex w-full flex-col overflow-hidden rounded-section border border-border bg-card shadow-elevated transition-shadow duration-300 ease-in-out"
                )}
              >
                <div className="relative min-h-[320px] flex-1 md:min-h-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {founderQuote && (
                  <div className="relative overflow-hidden bg-primary p-6 text-start sm:p-8">
                    {/* Decorative large background quote icon */}
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none">
                      <Quote size={120} className="text-secondary" />
                    </div>
                    
                    <Quote size={28} className="text-secondary mb-4 relative z-10" aria-hidden />
                    <Text variant="body" className="italic text-primary-foreground/95 relative z-10 text-lg leading-relaxed font-medium">
                      “{founderQuote.quote}”
                    </Text>
                    <div className="mt-6 relative z-10">
                      <Text variant="small" className="font-bold text-white text-base">
                        {founderQuote.author}
                      </Text>
                      {founderQuote.role && (
                        <Text variant="caption" className="text-secondary font-semibold tracking-wide uppercase mt-1 block">
                          {founderQuote.role}
                        </Text>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : highlights ? (
              <div className="grid w-full grid-cols-2 content-start gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 rounded-card border border-border bg-muted p-5 text-start"
                  >
                    <span aria-hidden className="text-secondary">
                      {h.icon}
                    </span>
                    <Text variant="small" className="font-medium text-foreground">
                      {h.label}
                    </Text>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* TEXT COLUMN */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" } }
              : {})}
            className="order-1 flex flex-col items-start gap-6 text-start md:order-2 md:py-4"
          >
            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-3">
              {eyebrow && <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">{eyebrow}</Heading>}
              <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-4">
              {paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body" className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </motion.div>

            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-4 grid w-full grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <Card interactive className="p-6 border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 bg-background rounded-card">
                <Heading level="h5" as="h3" className="text-primary font-bold mb-2">
                  {mission.title}
                </Heading>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </Text>
              </Card>
              <Card interactive className="p-6 border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 bg-background rounded-card">
                <Heading level="h5" as="h3" className="text-primary font-bold mb-2">
                  {vision.title}
                </Heading>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
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