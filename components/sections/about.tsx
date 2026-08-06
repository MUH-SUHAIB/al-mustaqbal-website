import { Quote } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import type { ImageContent, IconContent } from "./types";

export interface AboutHighlight {
  icon: IconContent;
  label: string;
}

export interface AboutContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "about". */
  id?: string;
  eyebrow?: string;
  title: string;
  /** Main body copy. Keep to 2–4 short paragraphs — split long copy into `paragraphs`. */
  paragraphs: string[];
  /** Mission statement, rendered as a Card alongside Vision. */
  mission: { title: string; description: string };
  /** Vision statement, rendered as a Card alongside Mission. */
  vision: { title: string; description: string };
  /**
   * Founder / clinic photo. Optional — when omitted, a muted placeholder
   * block renders in its place so the two-column layout never collapses
   * to a single column while real photography is pending.
   * Mutually exclusive with `highlights` — provide one or the other.
   */
  image?: ImageContent;
  /** Optional icon grid (e.g. "15+ Years", "Certified Staff") shown instead of an image. */
  highlights?: AboutHighlight[];
  /**
   * Optional founder quote, rendered as a highlighted card below the
   * Mission/Vision cards and above the appointment CTA.
   */
  founderQuote?: {
    quote: string;
    author: string;
    role?: string;
  };
  animate?: boolean;
}

/**
 * LAYOUT
 * Mobile:  single column — copy + mission/vision + CTA first, then the
 *          founder image/placeholder below.
 * Tablet+: two columns — copy (start side) | image, highlights, or
 *          placeholder (end side). Column order mirrors automatically
 *          under dir="rtl" (native CSS grid direction), so no separate
 *          Arabic layout is needed.
 *
 * DESIGN RULES
 * - Intro copy stays calm: no cards/shadows on the paragraphs themselves,
 *   generous line-height — reads like a trustworthy clinic brochure.
 * - Mission/Vision use the shared `Card` component (soft hover lift, one
 *   consistent visual language with Services/Doctors) rather than raw divs.
 * - SEO: renders real <h2>/<p> tags via Heading/Text, so crawlers see
 *   genuine prose, not empty divs.
 *
 * USAGE CONSTRAINTS
 * - Provide either `image` OR `highlights`. If neither is provided, a
 *   placeholder block renders — replace with a real founder/clinic photo
 *   before shipping a specific clinic's site.
 */
export function About({
  id,
  eyebrow,
  title,
  paragraphs,
  mission,
  vision,
  image,
  highlights,
  founderQuote,
  animate = false,
}: AboutContent) {
  return (
    <Section id={id} animate={animate}>
      <div className="grid grid-cols-1 items-start gap-xl md:grid-cols-2 md:gap-2xl">
        <div className="flex flex-col items-start gap-4 text-start">
          {eyebrow && <Heading level="h6">{eyebrow}</Heading>}
          <Heading level="h2">{title}</Heading>

          {paragraphs.map((paragraph, i) => (
            <Text key={i} variant="body">
              {paragraph}
            </Text>
          ))}

          <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Card interactive className="p-md">
              <Heading level="h5" as="h3">
                {mission.title}
              </Heading>
              <Text variant="small" className="mt-1">
                {mission.description}
              </Text>
            </Card>
            <Card interactive className="p-md">
              <Heading level="h5" as="h3">
                {vision.title}
              </Heading>
              <Text variant="small" className="mt-1">
                {vision.description}
              </Text>
            </Card>
          </div>

          {founderQuote && (
            <div className="relative w-full rounded-card border border-border bg-secondary p-md text-start">
              <Quote size={28} className="text-primary opacity-60" aria-hidden />
              <Text variant="body" className="mt-2 italic text-secondary-foreground">
                “{founderQuote.quote}”
              </Text>
              <Text variant="small" className="mt-3 font-semibold text-secondary-foreground">
                {founderQuote.author}
              </Text>
              {founderQuote.role && <Text variant="caption">{founderQuote.role}</Text>}
            </div>
          )}
        </div>

        {image && (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-section object-cover shadow-subtle md:aspect-auto"
          />
        )}

        {highlights && !image && (
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-start gap-2 rounded-card border border-border bg-muted p-md text-start"
              >
                <span aria-hidden>{h.icon}</span>
                <Text variant="small" className="text-foreground">
                  {h.label}
                </Text>
              </div>
            ))}
          </div>
        )}

        {!image && !highlights && (
          <div
            className="flex aspect-[4/5] w-full items-center justify-center rounded-section border border-dashed border-border bg-muted"
            aria-hidden
          >
            <Text variant="caption">Founder / Clinic Image</Text>
          </div>
        )}
      </div>
    </Section>
  );
}