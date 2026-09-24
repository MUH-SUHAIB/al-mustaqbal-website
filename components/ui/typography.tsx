"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  as?: React.ElementType;
}

export function Heading({
  level = "h2",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as || level;

  const styles = {
    h1: "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-tight",
    h2: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary leading-snug",
    h3: "text-xl sm:text-2xl font-bold text-foreground leading-snug",
    h4: "text-lg sm:text-xl font-semibold text-foreground",
    h5: "text-base sm:text-lg font-semibold text-foreground",
    h6: "text-xs sm:text-sm font-bold tracking-widest text-secondary uppercase",
  };

  return (
    <Component className={cn(styles[level], className)} {...props}>
      {children}
    </Component>
  );
}

// 1. Changed to HTMLElement so it accepts span/div/p attributes
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "body" | "lead" | "small" | "muted" | "caption";
  as?: React.ElementType; // 2. Added the 'as' prop definition
}

export function Text({
  variant = "body",
  as, // 3. Destructure 'as'
  className,
  children,
  ...props
}: TextProps) {
  const Component = as || "p"; // 4. Default to 'p' if 'as' is not provided

  const styles = {
    lead: "text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium",
    body: "text-base text-muted-foreground leading-relaxed",
    small: "text-sm text-muted-foreground leading-normal",
    muted: "text-xs text-muted-foreground/80",
    caption: "text-xs font-medium text-muted-foreground tracking-wide uppercase",
  };

  return (
    <Component className={cn(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
}