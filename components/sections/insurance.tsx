import { Section } from "./section-shell";
import { Text } from "@/components/ui/typography";

export interface InsuranceLogo {
  /** Logo image src. Omit to render a placeholder tile with `alt` as the label — useful before real logos are supplied. */
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
}

/**
 * LAYOUT
 * Mobile:  2 columns.
 * Tablet:  4 columns.
 * Desktop: 6 columns.
 *
 * DESIGN RULES
 * - Real logos render grayscale by default and gain color on hover
 *   (`grayscale hover:grayscale-0`) — a common trust-section convention
 *   that keeps the row visually calm and non-competing with brand colors.
 * - Logos without a `src` render as a bordered, muted placeholder tile
 *   showing the insurer's name — so the section looks complete before
 *   real logo artwork is supplied, and swapping in real logos later
 *   requires no layout changes.
 * - No shadows — this stays a plain, quiet trust row.
 * - RTL: grid + centered content mirrors automatically, no directional
 *   classes needed.
 */
export function Insurance({ id, eyebrow, title, description, logos, animate = false }: InsuranceContent) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:grid-cols-6">
        {logos.map((logo, i) =>
          logo.src ? (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="mx-auto h-10 w-auto object-contain grayscale opacity-70 transition duration-fast hover:grayscale-0 hover:opacity-100"
            />
          ) : (
            <div
              key={i}
              className="flex h-16 w-full items-center justify-center rounded-card border border-dashed border-border bg-muted px-2"
            >
              <Text variant="caption" className="text-center">
                {logo.alt}
              </Text>
            </div>
          )
        )}
      </div>
    </Section>
  );
}
