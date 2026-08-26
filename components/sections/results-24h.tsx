"use client";

import { motion } from "framer-motion";
import { Clock, MessageSquareText, CheckCircle2 } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { IconContent } from "./types";
import { staggerContainer, slideUp, fadeIn } from "@/lib/motion";

export interface ResultsStep {
  icon: IconContent;
  title: string;
  description: string;
}

export interface Results24hContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  highlight: string;
  highlightSubtext?: string;
  steps: ResultsStep[];
  animate?: boolean;
}

export function Results24h({
  id,
  eyebrow,
  title,
  description,
  highlight,
  highlightSubtext,
  steps,
  animate = true,
}: Results24hContent) {
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      {/* Background — subtle blue tone to differentiate from neighboring sections */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),rgba(37,99,235,0.06)_50%,var(--color-background)_100%)]" />
      </div>

      <Section id={id} className="py-xl md:py-2xl">
        <Container
          {...(animate
            ? {
                variants: staggerContainer,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px" },
              }
            : {})}
          className="flex flex-col items-center w-full"
        >
          {/* Header */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14 gap-3"
          >
            {eyebrow && <Heading level="h6">{eyebrow}</Heading>}
            <Heading level="h2" className="text-foreground">
              {title}
            </Heading>
            {description && (
              <Text variant="body" className="text-muted-foreground text-balance">
                {description}
              </Text>
            )}
          </motion.div>

          {/* Big Highlight Banner */}
          <motion.div
            {...(animate ? { variants: fadeIn } : {})}
            className="w-full max-w-3xl mb-10 md:mb-14"
          >
            <div className="relative overflow-hidden rounded-section border border-primary/20 bg-primary/5 px-6 py-8 sm:px-10 sm:py-10 text-center">
              <div
                className="pointer-events-none absolute -top-10 -end-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                aria-hidden
              />
              <span className="flex items-center justify-center gap-3 text-primary">
                <Clock size={32} aria-hidden />
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {highlight}
                </span>
              </span>
              {highlightSubtext && (
                <Text variant="body" className="mt-3 text-muted-foreground">
                  {highlightSubtext}
                </Text>
              )}
            </div>
          </motion.div>

          {/* Process Steps */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={i} {...(animate ? { variants: slideUp } : {})} className="h-full">
                <Card interactive className="group relative flex h-full flex-col items-center gap-4 p-6 text-center">
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    {step.icon}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <Heading level="h5" as="h3" className="text-foreground">
                      {step.title}
                    </Heading>
                    <Text variant="small" className="text-muted-foreground">
                      {step.description}
                    </Text>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}