"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { IconContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

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
    <div className="relative overflow-hidden">
      {/* Background gradient — consistent with Services / Facilities */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
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

          {/* Documents Grid */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map((doc, i) => (
              <motion.div key={i} {...(animate ? { variants: slideUp } : {})} className="h-full">
                <Card
                  interactive
                  className="group relative flex h-full flex-col gap-4 overflow-hidden p-6 text-start"
                >
                  {/* Number badge */}
                  <span
                    aria-hidden
                    className="absolute end-4 top-4 text-xs font-bold tracking-wider text-primary/30 transition-colors duration-300 group-hover:text-primary/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <span
                    aria-hidden
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    {doc.icon}
                  </span>

                  {/* Title + description */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden
                      />
                      <Heading level="h5" as="h3" className="text-foreground leading-snug">
                        {doc.title}
                      </Heading>
                    </div>
                    {doc.description && (
                      <Text variant="small" className="text-muted-foreground ps-6">
                        {doc.description}
                      </Text>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Optional footnote */}
          {note && (
            <motion.div {...(animate ? { variants: slideUp } : {})} className="mt-8 w-full max-w-3xl">
              <Text variant="small" className="text-center text-muted-foreground italic">
                {note}
              </Text>
            </motion.div>
          )}
        </Container>
      </Section>
    </div>
  );
}