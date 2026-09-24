"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { ImageContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface FacilityItem {
  image: ImageContent;
  label: string;
  description?: string;
}

export interface FacilitiesContent {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  facilities: FacilityItem[];
  animate?: boolean;
}

export function Facilities({
  id,
  eyebrow,
  title,
  description,
  facilities,
  animate = true,
}: FacilitiesContent) {
  const Container = animate ? motion.div : "div";

  // Creates a balanced 8-item Editorial Bento Grid
  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0:
        // Main Reception Hero: Spans 2x2 on desktop
        return "col-span-2 row-span-2 md:col-start-3 md:row-start-1";
      case 7:
        // Bottom Banner (Patient Comfort Area): Spans 2 cols on bottom right
        return "col-span-2 md:col-span-2 md:col-start-3 md:row-start-3";
      default:
        // Standard 1x1 cards
        return "col-span-1 row-span-1";
    }
  };

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
          className="flex flex-col items-center w-full max-w-7xl mx-auto"
        >
          {/* Section Header */}
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

          {/* Fully Responsive Bento Grid */}
          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[260px]">
            {facilities.map((facility, i) => (
              <motion.div
                key={i}
                {...(animate ? { variants: slideUp } : {})}
                className={`h-full w-full ${getBentoClasses(i)}`}
              >
                <Card className="group relative h-full w-full overflow-hidden border-border/50 rounded-[1.5rem] shadow-subtle transition-shadow duration-500 hover:shadow-elevated cursor-pointer bg-card">
                  {/* Edge-to-Edge Image */}
                  <img
                    src={facility.image.src}
                    alt={facility.image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* Dark Overlay Gradient for High Contrast Text - Replaced slate with deep bottle green/black */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A14]/95 via-[#0A1A14]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Label & Accent Line */}
                  <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-5 sm:p-6 md:p-7 transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                      {facility.label}
                    </h3>
                    
                    {/* Hover Accent Line - Changed from white to Gold */}
                    <div className="mt-3 h-[3px] w-8 bg-secondary/80 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-secondary rounded-full" />
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