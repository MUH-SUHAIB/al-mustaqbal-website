import type { Variants } from "framer-motion";

/**
 * Animation system for the clinic website engine.
 *
 * Rules this file encodes:
 * - No flashy motion — everything reads as calm, deliberate, "medical".
 * - One shared timing system so every component feels consistent.
 * - Keep these durations in sync with tailwind.config.ts transitionDuration.
 */

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

// Gentle ease-out — decelerates smoothly, never bounces or overshoots.
export const easing = [0.16, 1, 0.3, 1] as const;

/** Simple opacity fade. Use for text blocks, badges, small UI. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing },
  },
};

/** Fade + rise. Default for section content entering on scroll. */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing },
  },
};

/** Stagger wrapper — apply to a parent, pair children with `slideUp`/`fadeIn`. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
};

/** Soft scale for hoverable elements (cards, images). Not for buttons — see button.tsx. */
export const scaleHover = {
  whileHover: { scale: 1.02, transition: { duration: duration.fast, ease: easing } },
  whileTap: { scale: 0.99 },
};

/** Standard scroll-reveal props — spread onto a `motion.div`. */
export const scrollReveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
};
