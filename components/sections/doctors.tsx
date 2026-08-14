"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import type { ImageContent, IconContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface DoctorItem {
  /**
   * Doctor photo. Optional — omit to use `specialtyIcon` instead,
   * or omit both for a generic placeholder tile.
   */
  image?: ImageContent;
  /**
   * Equipment/specialty icon shown instead of a photo.
   */
  specialtyIcon?: IconContent;
  /** Optional badge shown over top-start corner, e.g. "Founder". */
  badge?: string;
  name: string;
  specialization: string;
  /** One short sentence — a scan-friendly credibility line. */
  description?: string;
  /** e.g. "12+ years experience" */
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

export function Doctors({
  id,
  eyebrow,
  title,
  description,
  doctors,
  animate = true,
}: DoctorsContent) {
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      {/* Symmetric background gradient identical to About and Services */}
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
          {/* Animated Header Block */}
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

          {/* Doctors Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {doctors.map((doctor, i) => (
              <motion.div
                key={i}
                {...(animate ? { variants: slideUp } : {})}
                className="h-full"
              >
                <Card 
                  interactive 
                  className="group relative flex h-full flex-col overflow-hidden rounded-section border border-border bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  {/* 
                      FIX APPLIED: 
                      Changed aspect-[4/3] to aspect-[3/2] (a standard landscape photo ratio). 
                      This prevents wide photos from being aggressively cropped on the sides and top.
                  */}
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
                    {doctor.image ? (
                      <img
                        src={doctor.image.src}
                        alt={doctor.image.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-primary"
                        aria-hidden
                      >
                        {doctor.specialtyIcon ?? (
                          <Text variant="caption">Doctor Photo</Text>
                        )}
                      </div>
                    )}

                    {/* Glassmorphic Badge */}
                    {doctor.badge && (
                      <span className="absolute start-3 top-3 rounded-full border border-border/80 bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-sm z-10">
                        {doctor.badge}
                      </span>
                    )}
                  </div>

                  {/* Content Block */}
                  <CardContent className="flex flex-1 flex-col p-5 sm:p-6 text-start">
                    <Heading level="h5" as="h3" className="text-foreground group-hover:text-primary transition-colors duration-200">
                      {doctor.name}
                    </Heading>

                    <Text variant="small" className="mt-1 font-medium text-primary">
                      {doctor.specialization}
                    </Text>

                    {doctor.description && (
                      <Text variant="small" className="mt-3 text-muted-foreground leading-relaxed flex-1">
                        {doctor.description}
                      </Text>
                    )}

                    {/* Experience Tag Footer */}
                    {doctor.experience && (
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                        <span className="inline-flex items-center text-xs font-medium text-muted-foreground bg-secondary/60 rounded-md px-2.5 py-1">
                          {doctor.experience}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}