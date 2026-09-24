"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

export interface CardProps extends HTMLMotionProps<"div"> {
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          /* Visible hairline border + resting shadow so cards read clearly
             against the warm beige background, even without hover. */
          "relative rounded-2xl border border-border bg-card overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          className
        )}
        whileHover={
          interactive
            ? { y: -4, boxShadow: "0 15px 30px -5px rgba(0,0,0,0.08)" }
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

export function CardImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
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
    <div className={cn("relative flex flex-col gap-1 p-6 pt-8", className)}>
      {/* The Signature Sharjah Government Gold Accent Line */}
      <div className="absolute top-0 left-6 h-[3px] w-10 bg-secondary" />
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3 className={cn("text-lg font-bold text-foreground", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("text-sm text-muted-foreground leading-relaxed font-medium", className)}>
      {children}
    </p>
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex items-center gap-3 px-6 pb-6 pt-2", className)}>
      {children}
    </div>
  );
}