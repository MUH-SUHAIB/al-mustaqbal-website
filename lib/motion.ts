import type { Variants } from "framer-motion";

/**
 * Animation system for the clinic website engine.
 *
 * Rules this file encodes:
 * - No flashy motion — everything reads as calm, deliberate, "medical".
 * - One shared timing system so every component feels consistent.
 * - Keep these durations in sync with tailwind.config.ts transitionDuration.
 * - Only the outermost container of a group should drive whileInView;
 *   children should only carry `variants` and inherit propagation from
 *   the parent's animate state. This avoids per-item IntersectionObservers
 *   getting stuck on long grids (documents, FAQ, facilities).
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

/**
 * Stagger wrapper — apply to a parent, pair children with `slideUp`/`fadeIn`.
 * Tuned so even long grids (7+ items) fully settle in well under a second,
 * both for real users and for automated/fast screenshot capture tools.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

/**
 * Use this instead of `staggerContainer` for grids that can have many items
 * (Documents, FAQ, Facilities, Services). Caps the total stagger spread so
 * item #20 doesn't wait any longer than item #8 — prevents "last items never
 * finish animating" on long lists.
 */
export function cappedStagger(itemCount: number, maxSpread = 0.4): Variants {
  const perItem = itemCount > 0 ? Math.min(0.06, maxSpread / itemCount) : 0.06;
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: perItem,
        delayChildren: 0.03,
      },
    },
  };
}

/** Soft scale for hoverable elements (cards, images). Not for buttons — see button.tsx. */
export const scaleHover = {
  whileHover: { scale: 1.02, transition: { duration: duration.fast, ease: easing } },
  whileTap: { scale: 0.99 },
};

/**
 * Standard scroll-reveal props — spread onto a `motion.div`.
 * margin widened from -80px to -100px 0px -100px 0px so content starts
 * revealing a bit earlier and has more time to fully settle before it's
 * likely to be captured or read.
 */
export const scrollReveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px 0px -100px 0px" },
};