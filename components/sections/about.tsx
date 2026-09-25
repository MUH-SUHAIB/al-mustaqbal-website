"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { staggerContainer, slideUp, duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ABOUT_IMAGE = {
  src: "/Al_mustaqbal/al-mustaqbal-medical-fitness-center-al-madam-sharjah.jpg",
  alt: "Al Mustaqbal Medical Fitness Examination Center in Al Madam, Sharjah"
};

export function About({
  id,
  animate = true,
}: {
  id?: string;
  animate?: boolean;
}) {
  const t = useTranslations("About");
  const TextWrapper = animate ? motion.div : "div";

  // Since we structured paragraphs as an array in the JSON file
  // We extract them using next-intl's raw() function to safely iterate
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <div className="relative overflow-hidden bg-card border-y border-border/40">
      <Section id={id} className="py-20 md:py-28" align="start">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 md:items-stretch">
          
          {/* IMAGE COLUMN */}
          <div className="order-2 flex w-full md:order-1">
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
                  src={ABOUT_IMAGE.src}
                  alt={t("title")}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </motion.div>
          </div>

          {/* TEXT COLUMN */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" } }
              : {})}
            className="order-1 flex flex-col items-start gap-6 text-start md:order-2 md:py-4"
          >
            {/* Header / Title */}
            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-3">
              <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">
                {t("eyebrow")}
              </Heading>
              <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
                {t("title")}
              </Heading>
            </motion.div>

            {/* Paragraphs loop */}
            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-4">
              {paragraphs.map((paragraph, i) => (
                <Text key={i} variant="body" className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </Text>
              ))}
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-4 grid w-full grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <Card interactive className="p-6 border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 bg-background rounded-card">
                <Heading level="h5" as="h3" className="text-primary font-bold mb-2">
                  {t("mission.title")}
                </Heading>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
                  {t("mission.description")}
                </Text>
              </Card>

              <Card interactive className="p-6 border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 bg-background rounded-card">
                <Heading level="h5" as="h3" className="text-primary font-bold mb-2">
                  {t("vision.title")}
                </Heading>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
                  {t("vision.description")}
                </Text>
              </Card>
            </motion.div>
          </TextWrapper>
        </div>
      </Section>
    </div>
  );
}