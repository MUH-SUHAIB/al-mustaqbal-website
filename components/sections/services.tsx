"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ImageContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface ServiceItem {
  image: ImageContent;
  title: string;
  description: string;
}

export interface ServicesContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  animate?: boolean;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Services({
  id,
  eyebrow,
  title,
  description,
  services,
  columns = 3,
  animate = true,
}: ServicesContent) {
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden bg-background">
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
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16 gap-4"
          >
            {eyebrow && <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">{eyebrow}</Heading>}
            <Heading level="h2" className="text-foreground text-3xl md:text-4xl font-bold">
              {title}
            </Heading>
            {description && (
              <Text variant="body" className="text-muted-foreground text-lg">
                {description}
              </Text>
            )}
          </motion.div>

          <div className={`grid grid-cols-1 gap-6 md:gap-8 w-full ${columnClasses[columns]}`}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                {...(animate ? { variants: slideUp } : {})}
                className="h-full"
              >
                <Card interactive className="group h-full flex flex-col overflow-hidden border border-border shadow-subtle hover:shadow-elevated transition-shadow duration-300 rounded-card bg-card">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted border-b border-border/50">
                    <img
                      src={service.image.src}
                      alt={service.image.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <CardHeader className="text-center flex flex-col items-center p-6 sm:p-8">
                    <CardTitle className="text-xl font-bold text-foreground mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}