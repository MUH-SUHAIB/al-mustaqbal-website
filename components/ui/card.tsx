"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  /** Adds the soft-lift hover animation. Turn off for static/decorative cards. */
  interactive?: boolean;
}

/**
 * Base card surface. Used for services, doctors, testimonials, facilities.
 * Compose with CardImage / CardHeader / CardTitle / CardDescription /
 * CardContent / CardFooter below.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-card border border-border bg-background shadow-subtle overflow-hidden",
          className
        )}
        whileHover={
          interactive
            ? { y: -4, boxShadow: "var(--shadow-hover)" }
            : undefined
        }
        transition={{ duration: duration.base, ease: easing }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

/** Optional image slot. Fills the card width, clipped to the card's radius. */
export function CardImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Defaults to "lazy" — card images are almost always below the fold. Pass "eager" for a card that renders above the fold. */
  loading?: "lazy" | "eager";
}) {
  return (
    // Plain <img> at the design-system layer to stay framework-flexible;
    // swap for next/image inside actual page components if needed.
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={cn("h-48 w-full object-cover", className)}
    />
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1 p-md", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("px-md pb-md", className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-3 px-md pb-md pt-2", className)}>
      {children}
    </div>
  );
}
