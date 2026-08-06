"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "./section-shell";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  /** Anchor id for nav links / SEO deep-linking, e.g. "faq". */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: FAQItem[];
  /** Allow more than one item open at once. Default false (classic single-open accordion). */
  allowMultiple?: boolean;
  animate?: boolean;
}

/**
 * LAYOUT
 * Single column at all breakpoints, max-width constrained to a narrow
 * centered list — FAQ reads best as prose, not a grid.
 *
 * ACCESSIBILITY / SEO
 * - Each question is a real <button> with aria-expanded + aria-controls,
 *   each answer panel has a matching id and role="region" — screen-reader
 *   and keyboard safe.
 * - Both question and answer are ALWAYS present in the DOM (only visually
 *   collapsed via grid-template-rows, never removed/display:none), so
 *   search engines index full Q&A content — important for clinics
 *   ranking on symptom/service queries.
 *
 * ANIMATION
 * Open/close animates the row's `grid-template-rows` from `0fr` to `1fr`
 * (a pure-CSS technique — no JS height measuring, no new dependency) so
 * answers of any length expand/collapse smoothly without a fixed max-height
 * cap that could clip a long answer. Duration/easing come from the existing
 * `duration-base` token, matching the rest of the motion system. The
 * chevron rotates 180° on open — the only other motion here.
 *
 * DESIGN RULES
 * - Simple border-bottom dividers, no card shadows — keeps a long list
 *   scannable without visual noise.
 * - RTL: question row uses `text-start` and `justify-between` (logical),
 *   so it mirrors automatically under dir="rtl" — no directional classes.
 */
export function FAQ({ id, eyebrow, title, description, items, allowMultiple = false, animate = false }: FAQContent) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<number>();
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Section id={id} eyebrow={eyebrow} title={title} description={description} animate={animate}>
      <div className="mx-auto max-w-2xl divide-y divide-border border-t border-border">
        {items.map((item, i) => {
          const isOpen = openIndexes.has(i);
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-question-${i}`;

          return (
            <div key={i}>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 py-md text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Text variant="body" as="span" className="font-medium">
                  {item.question}
                </Text>
                <ChevronDown
                  size={20}
                  aria-hidden
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform duration-fast",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows] duration-base ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <Text variant="small" className="pb-md">
                    {item.answer}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
