"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "./section-shell";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/button";
import type { CTAContent } from "./types";
import { staggerContainer, slideUp } from "@/lib/motion";

export interface TestimonialItem {
  name: string;
  /** Short patient review — 1–2 sentences reads best in a grid card. */
  review: string;
  /** Original review date (ISO string, e.g. "2025-01-15") — relative time ("3 months ago") is computed automatically at render time. */
  date: string;
  /** 1–5. Defaults to 5 — most clinics only surface their best reviews here. */
  rating?: number;
}

export interface TestimonialsContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "testimonials". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials: TestimonialItem[];
  /** Strong appointment CTA rendered centered below the grid — the conversion point of this section. */
  appointmentCta: CTAContent;
  animate?: boolean;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Computes a human-readable relative time ("3 months ago", "1 year ago")
 * from a stored ISO date string. Recalculated on every render, so the
 * displayed label stays accurate as time passes without manual edits.
 */
function getRelativeTime(dateString: string): string {
  const then = new Date(dateString).getTime();
  const diffDays = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden
          className={i < rating ? "fill-amber-400 text-amber-400" : "fill-none text-border"}
        />
      ))}
    </div>
  );
}

/**
 * LAYOUT
 * Mobile:  1 column.
 * Tablet:  2 columns.
 * Desktop: 3 columns.
 * Static grid only — no carousel, no autoplay, nothing to control. All
 * items in `testimonials` are rendered — there is no slice/limit here;
 * however many reviews are passed in, that many cards render, wrapping
 * into additional rows as needed.
 *
 * DESIGN RULES
 * - No photo dependency: each card shows a generated initials avatar
 *   (bg-secondary circle) rather than a patient photo — avoids needing
 *   real patient photography while still feeling personal.
 * - Stars use a premium gold/yellow fill (`amber-400`), independent of
 *   the site's primary brand color, matching standard review-star
 *   conventions.
 * - Review date is stored as an ISO string per testimonial and rendered
 *   through `getRelativeTime()`, so "3 months ago" etc. stays accurate
 *   automatically as time passes — never hardcoded.
 * - `Card interactive={false}` — these are read, not clicked, so no
 *   hover-lift affordance.
 * - RTL: text uses `text-start`; star row and avatar use `flex` with
 *   natural logical order, so the whole card mirrors under dir="rtl"
 *   with no directional classes.
 *
 * MOTION
 * Uses only the existing `staggerContainer` + `slideUp` variants —
 * identical pattern to Doctors/Facilities, for a consistent calm reveal.
 *
 * USAGE CONSTRAINTS
 * - `appointmentCta` is required — this section always ends with a
 *   conversion point. It opens in a new tab (`target="_blank"`), since
 *   it typically links to an external reviews page.
 */
export function Testimonials({
  id,
  eyebrow,
  title,
  description,
  testimonials,
  appointmentCta,
  animate = false,
}: TestimonialsContent) {
  const GridWrapper = animate ? motion.div : "div";

  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <GridWrapper
        {...(animate
          ? { variants: staggerContainer, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } }
          : {})}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((item, i) => (
          <motion.div key={i} {...(animate ? { variants: slideUp } : {})}>
            <Card interactive={false} className="flex h-full flex-col gap-3 p-md text-start">
              <StarRating rating={item.rating ?? 5} />
              <Text variant="body" className="italic" dir="auto">
                “{item.review}”
              </Text>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
                  aria-hidden
                >
                  {initials(item.name)}
                </span>
                <div>
                  <Text variant="body" className="font-medium">
                    {item.name}
                  </Text>
                  <Text variant="caption">{getRelativeTime(item.date)}</Text>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </GridWrapper>

      <div className="mt-lg flex justify-center">
        <LinkButton
          href={appointmentCta.href}
          variant={appointmentCta.variant ?? "primary"}
          size="lg"
          icon={appointmentCta.icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          {appointmentCta.label}
        </LinkButton>
      </div>
    </Section>
  );
}