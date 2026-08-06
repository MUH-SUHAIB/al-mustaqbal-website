import { Section } from "./section-shell";
import { Card, CardImage, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ImageContent } from "./types";

export interface ServiceItem {
  image: ImageContent;
  title: string;
  description: string;
}

export interface ServicesContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "services". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  services: ServiceItem[];
  /** Max grid columns at desktop width. Grid is always responsive down to 1 column on mobile. */
  columns?: 2 | 3 | 4;
  animate?: boolean;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * LAYOUT
 * Mobile:  1 column, full-width cards.
 * Tablet:  2 columns.
 * Desktop: `columns` prop (2–4), default 3.
 *
 * DESIGN RULES
 * - Hover lift is inherited from the Card component (soft, not heavy) —
 *   no extra motion is added here.
 * - Each card leads with a full-width image (via `CardImage`) at a fixed
 *   h-48 height with `object-cover`, clipped to the card's rounded top
 *   corners by `Card`'s own `overflow-hidden` — every card stays the
 *   same height regardless of source image dimensions.
 * - RTL: the grid and card content use flex/grid default flow and
 *   `text-start`-based typography (inherited from Card/Typography), so
 *   the whole grid mirrors under dir="rtl" with no extra classes here.
 *
 * USAGE CONSTRAINTS
 * - Keep `description` per service short (1 sentence) — this is a scan
 *   grid, not a detail page. Link to a dedicated service page for depth.
 */
export function Services({
  id,
  eyebrow,
  title,
  description,
  services,
  columns = 3,
  animate = false,
}: ServicesContent) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns]}`}>
        {services.map((service, i) => (
          <Card key={i} className="h-full">
            <CardImage src={service.image.src} alt={service.image.alt} />
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}