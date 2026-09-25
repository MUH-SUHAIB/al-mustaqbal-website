"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  FileText, 
  Contact, 
  ClipboardList, 
  Building2, 
  Camera, 
  Stamp 
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { cappedStagger, slideUp } from "@/lib/motion";
import type { IconContent } from "./types";

// Type definitions re-exported for index.ts compatibility
export interface RequiredDocumentItem {
  icon: IconContent;
  title: string;
  description?: string;
}

export interface RequiredDocumentsContent {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  documents?: RequiredDocumentItem[];
  note?: string;
  animate?: boolean;
}

const DOCUMENT_ITEMS = [
  { key: "uid", icon: <FileText className="w-6 h-6" /> },
  { key: "eid", icon: <Contact className="w-6 h-6" /> },
  { key: "passport", icon: <FileText className="w-6 h-6" /> },
  { key: "visa", icon: <ClipboardList className="w-6 h-6" /> },
  { key: "tradeLicense", icon: <Building2 className="w-6 h-6" /> },
  { key: "photo", icon: <Camera className="w-6 h-6" /> },
  { key: "healthCard", icon: <Stamp className="w-6 h-6" /> },
];

export function RequiredDocuments({
  id,
  animate = true,
}: RequiredDocumentsContent) {
  const t = useTranslations("RequiredDocuments");
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden bg-background">
      <Section id={id} className="py-20 md:py-28">
        <Container
          {...(animate
            ? {
                variants: cappedStagger(DOCUMENT_ITEMS.length),
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

          {/* Documents Grid */}
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOCUMENT_ITEMS.map((doc, i) => {
              const title = t(`documents.${doc.key}.title`);
              const description = t(`documents.${doc.key}.description`);

              return (
                <motion.div key={doc.key} {...(animate ? { variants: slideUp } : {})} className="h-full">
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
                          {title}
                        </Heading>
                      </div>
                      <Text variant="small" className="text-muted-foreground ps-7 leading-relaxed">
                        {description}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Footnote Alert Box */}
          <motion.div {...(animate ? { variants: slideUp } : {})} className="mt-10 w-full max-w-3xl rounded-xl bg-primary/5 p-4 md:p-5 border border-primary/10 flex items-center justify-center">
            <Text variant="small" className="text-center text-primary font-semibold text-sm md:text-base">
              {t("note")}
            </Text>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

export default RequiredDocuments;