"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Card, CardImage, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import type { ImageContent, IconContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface DoctorItem {
  /**
   * Doctor photo. Optional — omit to use `specialtyIcon` instead (e.g. for
   * clinics that prefer not to display staff photos), or omit both for a
   * generic placeholder tile.
   */
  image?: ImageContent;
  /**
   * Equipment/specialty icon shown instead of a photo — e.g. a stethoscope
   * for cardiology, a tooth for dentistry. Rendered in a fixed-height tile
   * the same size as the photo slot, so card height stays identical
   * whether a doctor has a photo or an icon.
   */
  specialtyIcon?: IconContent;
  /** Optional small badge shown over the photo, e.g. "Founder". */
  badge?: string;
  name: string;
  specialization: string;
  /** One short sentence — a scan-friendly credibility line, not a full bio. */
  description?: string;
  /** e.g. "12 years experience" — kept as a plain string so copy/locale controls exact phrasing. */
  experience?: string;
}

export interface DoctorsContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "doctors". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  doctors: DoctorItem[];
  animate?: boolean;
}

/**
 * LAYOUT
 * Mobile:  1 column.
 * Tablet:  2 columns.
 * Desktop: 3 columns (fixed, per spec).
 *
 * DESIGN RULES
 * - Every card has an identical h-48 visual slot at the top — a real
 *   photo (`CardImage`), a specialty-icon tile, or a generic placeholder
 *   tile — so card height never varies with content availability.
 * - Optional `badge` (e.g. "Founder") renders as a small pill over the
 *   top-start corner of the image slot.
 * - Name is the visual anchor (h3-weight); specialization is secondary;
 *   description/experience are tertiary/muted — trust hierarchy, not
 *   decoration.
 * - RTL: card content uses `text-start`, and the badge uses `start-3`
 *   (not `left-3`), both inherited/mirrored automatically under
 *   dir="rtl" — no directional classes needed here.
 *
 * MOTION
 * Uses only the existing `staggerContainer` + `slideUp` variants — cards
 * reveal one after another rather than all at once, still calm/medical
 * (same duration/easing as the rest of the system).
 */
export function Doctors({
  id,
  eyebrow,
  title,
  description,
  doctors,
  animate = false,
}: DoctorsContent) {
  const GridWrapper = animate ? motion.div : "div";

  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <GridWrapper
        {...(animate
          ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } }
          : {})}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {doctors.map((doctor, i) => (
          <motion.div key={i} {...(animate ? { variants: slideUp } : {})}>
            <Card className="flex h-full flex-col">
              <div className="relative">
                {doctor.image ? (
                  <CardImage src={doctor.image.src} alt={doctor.image.alt} className="object-top" />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-muted text-primary" aria-hidden>
                    {doctor.specialtyIcon ?? (
                      <Text variant="caption">Doctor Photo</Text>
                    )}
                  </div>
                )}
                {doctor.badge && (
                  <span className="absolute start-3 top-3 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow-subtle">
                    {doctor.badge}
                  </span>
                )}
              </div>
              <CardContent className="flex flex-1 flex-col pt-md text-start">
                <Heading level="h5" as="h3">
                  {doctor.name}
                </Heading>
                <Text variant="small" className="mt-1 text-primary">
                  {doctor.specialization}
                </Text>
                {doctor.description && (
                  <Text variant="small" className="mt-2">
                    {doctor.description}
                  </Text>
                )}
                {doctor.experience && (
                  <Text variant="caption" className="mt-auto pt-2">
                    {doctor.experience}
                  </Text>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </GridWrapper>
    </Section>
  );
}