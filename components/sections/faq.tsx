"use client";

import { useState, useId, memo } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown, MessageCircle, PhoneCall } from "lucide-react";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { cappedStagger, slideUp, duration, easing } from "@/lib/motion";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FAQSupport {
  title: string;
  description: string;
  phoneLabel: string;
  phoneLink: string;
  whatsappLabel: string;
  whatsappLink: string;
}

export interface FAQContent {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FAQItem[];
  support?: FAQSupport;
  allowMultiple?: boolean;
  animate?: boolean;
  className?: string;
}

interface AccordionCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  animate: boolean;
  baseId: string;
}

const FAQAccordionCard = memo(function FAQAccordionCard({
  item,
  index,
  isOpen,
  onToggle,
  animate,
  baseId,
}: AccordionCardProps) {
  const panelId = baseId + "-panel-" + index;
  const buttonId = baseId + "-button-" + index;

  const motionProps = animate
    ? {
        variants: slideUp as Variants,
        whileHover: { y: -2 },
        transition: { duration: duration.base, ease: easing },
      }
    : {};

  return (
    <motion.div {...motionProps} className="group relative h-fit">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-card transition-all duration-300",
          isOpen
            ? "border-primary/30 shadow-elevated"
            : "border-border/60 hover:border-primary/30 hover:shadow-subtle"
        )}
      >
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="flex w-full items-center justify-between gap-4 p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:p-6"
        >
          <Text
            variant="body"
            as="span"
            className={cn(
              "min-w-0 pe-2 font-bold leading-relaxed transition-colors duration-200 text-lg",
              isOpen
                ? "text-primary"
                : "text-foreground group-hover:text-primary"
            )}
          >
            {item.question}
          </Text>

          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              isOpen
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground group-hover:bg-secondary/20 group-hover:text-secondary"
            )}
          >
            <ChevronDown
              size={20}
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300 ease-out",
                isOpen && "rotate-180"
              )}
            />
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-border/40 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
              <Text
                variant="body"
                className="leading-relaxed text-muted-foreground"
              >
                {item.answer}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

FAQAccordionCard.displayName = "FAQAccordionCard";

interface FAQSupportCTAProps {
  support: FAQSupport;
  animate: boolean;
}

const FAQSupportCTA = memo(function FAQSupportCTA({
  support,
  animate,
}: FAQSupportCTAProps) {
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.2 },
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      className="relative mt-12 overflow-hidden rounded-[1.5rem] border border-border bg-background p-6 shadow-subtle sm:p-10"
    >
      {/* Decorative corner blur */}
      <div
        className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
        <div className="max-w-xl">
          <Heading level="h4" className="font-bold text-foreground">
            {support.title}
          </Heading>
          <Text
            variant="body"
            className="mt-2 leading-relaxed text-muted-foreground"
          >
            {support.description}
          </Text>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:shrink-0 sm:flex-row">
          {support.whatsappLink && (
            <a
              href={support.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] shadow-subtle hover:shadow-[#25D366]/30"
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span>{support.whatsappLabel}</span>
            </a>
          )}

          {support.phoneLink && (
            <a
              href={support.phoneLink}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 shadow-subtle hover:shadow-primary/30"
            >
              <PhoneCall size={20} aria-hidden="true" />
              <span>{support.phoneLabel}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

FAQSupportCTA.displayName = "FAQSupportCTA";

export function FAQ({
  id,
  eyebrow,
  title,
  description,
  items = [],
  support,
  allowMultiple = false,
  animate = true,
  className,
}: FAQContent) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const baseId = useId();

  const handleToggle = (index: number) => {
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const gridAnimationProps = animate
    ? {
        variants: cappedStagger(items.length) as Variants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px 0px -60px 0px" },
      }
    : {};

  return (
    <div className={cn("relative w-full overflow-hidden bg-card border-y border-border/40", className)}>
      <Section
        id={id}
        animate={animate}
        className="py-20 md:py-28 bg-transparent"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <div className="mx-auto w-full max-w-5xl">
          {/* Section Header */}
          <motion.div
            {...(animate ? { variants: slideUp as Variants } : {})}
            className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16 gap-4"
          >
            {eyebrow && <Heading level="h6" className="text-secondary uppercase tracking-wider text-sm font-bold">{eyebrow}</Heading>}
            {title && (
              <Heading level="h2" className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </Heading>
            )}
            {description && (
              <Text variant="body" className="text-muted-foreground text-lg text-balance">
                {description}
              </Text>
            )}
          </motion.div>

          <motion.div
            {...gridAnimationProps}
            className="grid gap-4 md:grid-cols-2 lg:gap-5"
          >
            {items.map((item, index) => (
              <FAQAccordionCard
                key={item.id ?? item.question + "-" + index}
                item={item}
                index={index}
                isOpen={openIndexes.has(index)}
                onToggle={handleToggle}
                animate={!!animate}
                baseId={baseId}
              />
            ))}
          </motion.div>

          {support && <FAQSupportCTA support={support} animate={!!animate} />}
        </div>
      </Section>
    </div>
  );
}