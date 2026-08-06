"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heading, Text } from "@/components/ui/typography";
import { slideUp, scrollReveal } from "@/lib/motion";

export interface SectionProps {
  /** Anchor id for nav links / SEO deep-linking (e.g. "services"). */
  id?: string;
  /** Small label above the title, e.g. "OUR SERVICES". Optional. */
  eyebrow?: string;
  /** Section heading. Optional — some sections (Footer, Contact) render their own heading structure. */
  title?: string;
  /** Supporting paragraph under the title. Optional. */
  description?: string;
  /** Header text alignment. Most content sections: "center". Two-column layouts (Hero, About): "start". */
  align?: "center" | "start";
  /** Alternate background to create rhythm between stacked sections without any hardcoded color. */
  tone?: "default" | "muted";
  /** Turns on the section's fade/slide-up reveal. Off by default — animation is opt-in per the motion rules. */
  animate?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Layout structure (every section template is built on this):
 * <section> > container (max-w-7xl, responsive px) > optional header block > children
 *
 * This is the ONLY place that defines outer section spacing/width, so every
 * page assembled from these templates shares identical rhythm and never
 * needs a one-off wrapper.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  animate = false,
  className,
  children,
}: SectionProps) {
  const Wrapper = animate ? motion.div : "div";
  const wrapperMotionProps = animate ? { variants: slideUp, ...scrollReveal } : {};

  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section
      id={id}
      className={cn(
        "py-2xl md:py-3xl",
        tone === "muted" && "bg-muted",
        className
      )}
    >
      <Wrapper
        {...wrapperMotionProps}
        className={cn(
          "mx-auto max-w-7xl px-md md:px-lg",
          align === "center" && "text-center"
        )}
      >
        {hasHeader && (
          <div
            className={cn(
              "mx-auto mb-xl flex max-w-2xl flex-col gap-3",
              align === "center" ? "items-center" : "items-start text-start"
            )}
          >
            {eyebrow && <Heading level="h6">{eyebrow}</Heading>}
            {title && <Heading level="h2">{title}</Heading>}
            {description && <Text variant="body">{description}</Text>}
          </div>
        )}
        {children}
      </Wrapper>
    </section>
  );
}
