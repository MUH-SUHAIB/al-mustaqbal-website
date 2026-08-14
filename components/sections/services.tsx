"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardImage, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ImageContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface ServiceItem {
  image: ImageContent;
  title: string;
  description: string;
}

export interface ServicesContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "services". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  services: ServiceItem[];
  /** Max grid columns at desktop width. Grid is always responsive down to 1 column on mobile. */
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
    <div className="relative overflow-hidden">
      {/* Exact symmetric background gradient matching the About section */}
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
          {/* Animated Header Block (Reverted back to default design system typography) */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14 gap-3"
          >
            {eyebrow && <Heading level="h6">{eyebrow}</Heading>}
            <Heading level="h2" className="text-foreground">
              {title}
            </Heading>
            {description && (
              <Text variant="body" className="text-muted-foreground">
                {description}
              </Text>
            )}
          </motion.div>

          {/* Animated Services Grid */}
          <div className={`grid grid-cols-1 gap-6 w-full ${columnClasses[columns]}`}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                {...(animate ? { variants: slideUp } : {})}
                className="h-full"
              >
                <Card interactive className="h-full flex flex-col overflow-hidden">
                  <CardImage src={service.image.src} alt={service.image.alt} />
                  <CardHeader className="text-center flex flex-col items-center">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
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