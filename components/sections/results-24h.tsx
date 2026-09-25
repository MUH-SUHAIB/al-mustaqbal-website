"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ClipboardCheck, Send, MessageSquareText } from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { IconContent } from "./types";
import { staggerContainer, slideUp, fadeIn } from "@/lib/motion";

// Type definitions re-exported for index.ts compatibility
export interface ResultsStep {
  icon: IconContent;
  title: string;
  description: string;
}

export interface Results24hContent {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  highlight?: string;
  highlightSubtext?: string;
  steps?: ResultsStep[];
  animate?: boolean;
}

const STEPS_DATA = [
  { key: "step1", icon: <ClipboardCheck className="w-6 h-6" /> },
  { key: "step2", icon: <Send className="w-6 h-6" /> },
  { key: "step3", icon: <MessageSquareText className="w-6 h-6" /> },
];

export function Results24h({
  id,
  animate = true,
}: Results24hContent) {
  const t = useTranslations("Results24h");
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden bg-card border-y border-border/40">
      <Section id={id} className="py-20 md:py-28">
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
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-14 gap-4"
          >
            <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">
              {t("eyebrow")}
            </Heading>
            <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
              {t("title")}
            </Heading>
            <Text variant="body" className="text-muted-foreground text-lg text-balance">
              {t("description")}
            </Text>
          </motion.div>

          {/* Big Highlight Banner */}
          <motion.div
            {...(animate ? { variants: fadeIn } : {})}
            className="w-full max-w-4xl mb-12 md:mb-16"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 sm:px-12 sm:py-12 text-center shadow-elevated">
              {/* Decorative background circles */}
              <div
                className="absolute -top-20 -end-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute -bottom-20 -start-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
                aria-hidden
              />
              
              <span className="flex items-center justify-center gap-4 text-secondary relative z-10">
                <Clock size={36} aria-hidden strokeWidth={2.5} />
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {t("highlight")}
                </span>
              </span>
              <Text variant="body" className="mt-4 text-primary-foreground/90 font-medium text-lg relative z-10">
                {t("highlightSubtext")}
              </Text>
            </div>
          </motion.div>

          {/* Process Steps */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl">
            {STEPS_DATA.map((step) => {
              const title = t(`steps.${step.key}.title`);
              const description = t(`steps.${step.key}.description`);

              return (
                <motion.div key={step.key} {...(animate ? { variants: slideUp } : {})} className="h-full">
                  <Card interactive className="group relative flex h-full flex-col items-center gap-5 p-8 text-center bg-background border border-border shadow-subtle hover:shadow-elevated transition-all duration-300 rounded-card">
                    <span
                      aria-hidden
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform duration-500 group-hover:scale-110 group-hover:bg-secondary/20"
                    >
                      {step.icon}
                    </span>
                    <div className="flex flex-col gap-2">
                      <Heading level="h5" as="h3" className="text-foreground font-bold text-xl">
                        {title}
                      </Heading>
                      <Text variant="small" className="text-muted-foreground leading-relaxed">
                        {description}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default Results24h;