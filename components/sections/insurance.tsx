"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Text } from "@/components/ui/typography";
import { staggerContainer, slideUp, duration, easing } from "@/lib/motion";

export interface InsuranceLogo {
  /** Logo image src. Omit to render a placeholder tile with `alt` as the label. */
  src?: string;
  /** Insurer name — used as alt text when `src` is provided, and as the visible label when it isn't. */
  alt: string;
}

export interface InsuranceContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "insurance". */
  id?: string;
  eyebrow?: string;
  title: string;
  /** Short supporting line above the grid, e.g. "We work with all major providers." */
  description?: string;
  logos: InsuranceLogo[];
  animate?: boolean;
  playful?: boolean;
}

const TILT_DEGREES = [-2, 1.5, -1, 2, -1.5, 1, -2];

/**
 * Grid mapping for the 7-card layout on desktop:
 * - 1 center card (2x2)
 * - 1 top card
 * - 2 left cards
 * - 2 right cards
 * - 1 bottom card
 */
const getGridLayout = (index: number) => {
  switch (index) {
    case 0:
      return {
        layout: "col-span-2 row-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2",
        isCenter: true,
      };
    case 1:
      return { layout: "col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-1", isCenter: false };
    case 2:
      return { layout: "col-span-1 lg:col-start-1 lg:row-start-2", isCenter: false };
    case 3:
      return { layout: "col-span-1 lg:col-start-1 lg:row-start-3", isCenter: false };
    case 4:
      return { layout: "col-span-1 lg:col-start-4 lg:row-start-2", isCenter: false };
    case 5:
      return { layout: "col-span-1 lg:col-start-4 lg:row-start-3", isCenter: false };
    case 6:
      return { layout: "col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-4", isCenter: false };
    default:
      return { layout: "col-span-1 lg:col-span-2", isCenter: false };
  }
};

function LogoCard({
  logo,
  index,
  animate,
  playful,
}: {
  logo: InsuranceLogo;
  index: number;
  animate: boolean;
  playful: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const tilt = playful ? TILT_DEGREES[index % TILT_DEGREES.length] : 0;
  const config = getGridLayout(index);

  return (
    <motion.div {...(animate ? { variants: slideUp } : {})} className={`flex w-full ${config.layout}`}>
      <motion.div
        initial={false}
        animate={{ rotate: tilt }}
        whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
        transition={{ duration: duration.base, ease: easing }}
        className="group relative h-full w-full transform-gpu"
      >
        <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-25 dark:from-blue-600 dark:to-blue-500" />

        <div className="relative flex h-full w-full min-h-[120px] items-center justify-center overflow-hidden rounded-3xl border border-blue-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] sm:p-8 dark:border-blue-800/40 dark:bg-slate-900/60 dark:group-hover:border-blue-500/80 dark:group-hover:shadow-[0_20px_40px_-15px_rgba(29,78,216,0.3)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-transparent to-blue-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-blue-900/20 dark:to-blue-900/10" />

          {logo.src && !hasError ? (
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              onError={() => setHasError(true)}
              className={`relative z-10 h-auto w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 ${
                config.isCenter ? "max-h-20 sm:max-h-28" : "max-h-12 sm:max-h-16"
              }`}
            />
          ) : (
            <Text variant={config.isCenter ? "body" : "small"} className="relative z-10 text-center font-medium text-foreground">
              {logo.alt}
            </Text>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Insurance({
  id,
  eyebrow,
  title,
  description,
  logos,
  animate = false,
  playful = false,
}: InsuranceContent) {
  return (
    <div className="relative w-full overflow-hidden">
      {/*
        Seam fix: this MUST start at the exact color Testimonials' own
        gradient ends at (rgba(219,234,254,0.4)), not at `transparent`.
        Starting transparent guarantees a mismatch, since the section
        above doesn't end transparent — it ends at a visible pale-blue
        tint. Matching that exact value at 0% is what actually removes
        the seam; everything after 0% is free to fade however you like.
        Dark mode is untouched — Testimonials' dark gradient already
        ends at `transparent`, so starting transparent here already
        matches correctly in dark mode.
      */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(219,234,254,0.4)_0%,rgba(239,246,255,0.2)_45%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(30,64,175,0.04)_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <Section
        id={id}
        eyebrow={eyebrow}
        title={title}
        description={description}
        animate={animate}
        className="border-none bg-transparent"
      >
        <motion.div
          {...(animate
            ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" } }
            : {})}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-4 lg:gap-6"
        >
          {logos.map((logo, index) => (
            <LogoCard key={`${logo.alt}-${index}`} logo={logo} index={index} animate={animate} playful={playful} />
          ))}
        </motion.div>
      </Section>
    </div>
  );
}