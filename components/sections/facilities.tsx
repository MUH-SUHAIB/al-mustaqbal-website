"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Card, CardImage, CardHeader, CardTitle } from "@/components/ui/card";
import type { ImageContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface FacilityItem {
  image: ImageContent;
  label: string;
  /** Optional description kept for future use (not currently displayed). */
  description?: string;
}

export interface FacilitiesContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "facilities". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  facilities: FacilityItem[];
  animate?: boolean;
}

/**
 * LAYOUT
 * Mobile: 2 columns.
 * Tablet: 3 columns.
 * Desktop: 4+ columns (auto-fit minmax grid).
 *
 * DESIGN
 * - Uses the shared Card component.
 * - Each card displays a facility image and title only.
 * - Images maintain equal height across all cards.
 * - Responsive and RTL compatible.
 *
 * MOTION
 * Uses the existing staggerContainer and slideUp animations.
 */
export function Facilities({
  id,
  eyebrow,
  title,
  description,
  facilities,
  animate = false,
}: FacilitiesContent) {
  const GridWrapper = animate ? motion.div : "div";

  return (
    <Section
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      tone="muted"
      animate={animate}
    >
      <GridWrapper
        {...(animate
          ? {
              variants: staggerContainer,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-80px" },
            }
          : {})}
        className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
      >
        {facilities.map((facility, i) => (
          <motion.div
            key={i}
            {...(animate ? { variants: slideUp } : {})}
          >
            <Card className="h-full">
              <CardImage
                src={facility.image.src}
                alt={facility.image.alt}
              />

              <CardHeader>
                <CardTitle className="text-base">
                  {facility.label}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </GridWrapper>
    </Section>
  );
}