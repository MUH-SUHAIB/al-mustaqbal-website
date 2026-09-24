"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { IconContent } from "./types";
import { cappedStagger, slideUp } from "@/lib/motion";

export interface RequiredDocumentItem {
  icon: IconContent;
  title: string;
  description?: string;
}

export interface RequiredDocumentsContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  documents: RequiredDocumentItem[];
  note?: string;
  animate?: boolean;
}

export function RequiredDocuments({
  id,
  eyebrow,
  title,
  description,
  documents,
  note,
  animate = true,
}: RequiredDocumentsContent) {
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden bg-background">
      <Section id={id} className="py-20 md:py-28">
        <Container
          {...(animate
            ? {
                variants: cappedStagger(documents.length),
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px 0px -50px 0px" },
              }
            : {})}
          className="flex flex-col items-center w-full"
        >
          {/* Header */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16 gap-4"
          >
            {eyebrow && <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">{eyebrow}</Heading>}
            <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </Heading>
            {description && (
              <Text variant="body" className="text-muted-foreground text-lg text-balance">
                {description}
              </Text>
            )}
          </motion.div>

          {/* Documents Grid */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((doc, i) => (
              <motion.div key={i} {...(animate ? { variants: slideUp } : {})} className="h-full">
                <Card
                  interactive
                  className="group relative flex h-full flex-col gap-5 overflow-hidden p-6 sm:p-8 text-start border border-border/60 shadow-subtle hover:shadow-elevated transition-all duration-300 bg-card rounded-card"
                >
                  {/* Number badge */}
                  <span
                    aria-hidden
                    className="absolute end-5 top-5 text-sm font-black tracking-wider text-muted-foreground/20 transition-colors duration-300 group-hover:text-secondary/40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <span
                    aria-hidden
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10"
                  >
                    {doc.icon}
                  </span>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-secondary"
                        aria-hidden
                      />
                      <Heading level="h5" as="h3" className="text-foreground font-bold leading-snug">
                        {doc.title}
                      </Heading>
                    </div>
                    {doc.description && (
                      <Text variant="small" className="text-muted-foreground ps-7 leading-relaxed">
                        {doc.description}
                      </Text>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Important Footnote Alert Box */}
          {note && (
            <motion.div {...(animate ? { variants: slideUp } : {})} className="mt-10 w-full max-w-3xl rounded-xl bg-primary/5 p-4 md:p-5 border border-primary/10 flex items-center justify-center">
              <Text variant="small" className="text-center text-primary font-semibold text-sm md:text-base">
                {note}
              </Text>
            </motion.div>
          )}
        </Container>
      </Section>
    </div>
  );
}