"use client";

import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import type { ImageContent, IconContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface DoctorItem {
  image?: ImageContent;
  specialtyIcon?: IconContent;
  badge?: string;
  name: string;
  specialization: string;
  description?: string;
  experience?: string;
  gender?: "male" | "female";
}

export interface DoctorsContent {
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

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {doctors.map((doctor, i) => {
              const isFemale = doctor.gender?.toLowerCase() === "female";

              return (
                <motion.div
                  key={i}
                  {...(animate ? { variants: slideUp } : {})}
                  className="h-full"
                >
                  <Card
                    interactive
                    className={`group relative flex h-full flex-col overflow-hidden rounded-section border border-border bg-background transition-all duration-300 ${
                      isFemale
                        ? "hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]"
                        : "hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    {/* Image Slot Container */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                      {doctor.image ? (
                        <img
                          src={doctor.image.src}
                          alt={doctor.image.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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
                      <Heading
                        level="h5"
                        as="h3"
                        className={`text-foreground transition-colors duration-200 ${
                          isFemale ? "group-hover:text-pink-600" : "group-hover:text-primary"
                        }`}
                      >
                        {doctor.name}
                      </Heading>

                      <Text
                        variant="small"
                        className={`mt-1 font-medium ${
                          isFemale ? "text-pink-600" : "text-primary"
                        }`}
                      >
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
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}