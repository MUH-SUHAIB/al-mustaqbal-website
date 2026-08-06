import type { ReactNode } from "react";

/** A single call-to-action. Sections render these via the Button system — never a raw <a>/<button>. */
export interface CTAContent {
  label: string;
  href: string;
  /** Defaults vary per section (see each template) — override only when a section needs a specific hierarchy. */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: ReactNode;
}

/** Image content slot. Alt text is required — never optional, for SEO + accessibility. */
export interface ImageContent {
  src: string;
  alt: string;
}

/** Generic icon type — sections accept any icon element (lucide-react, custom SVG, etc.) so the design
 * system is never locked to one icon library. */
export type IconContent = ReactNode;
