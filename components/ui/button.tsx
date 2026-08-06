"use client";

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration, easing } from "@/lib/motion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon element (e.g. from lucide-react). Sizing/color is handled by the button. */
  icon?: ReactNode;
  /**
   * Logical position — "start"/"end" instead of "left"/"right" so the icon
   * lands on the correct side automatically under dir="rtl".
   */
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium " +
  "rounded-button transition-colors duration-fast " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  // Generous touch target — comfortable for mobile tap targets (44px+).
  lg: "h-12 px-8 text-lg",
};

const variants: Record<ButtonVariant, string> = {
  // Primary CTA — calls, WhatsApp, "Book Appointment".
  primary: "bg-primary text-primary-foreground shadow-subtle hover:bg-primary-hover hover:shadow-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean | undefined,
  className: string | undefined
) {
  return cn(base, sizes[size], variants[variant], fullWidth && "w-full", className);
}

function IconSlot({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0" aria-hidden>
      {children}
    </span>
  );
}

export interface ButtonProps
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {}

/**
 * Use for in-page ACTIONS: submit a form, open a modal, toggle state.
 * For navigation/CTAs (Call Now, WhatsApp, "View all services") use
 * `LinkButton` instead — it renders a real <a>, which matters for
 * accessibility, SEO, and correct browser behavior (open in new tab,
 * copy link, etc.).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps & HTMLMotionProps<"button">>(
  (
    { className, variant = "primary", size = "md", icon, iconPosition = "end", fullWidth, children, disabled, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        className={buttonClassName(variant, size, fullWidth, className)}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: duration.fast, ease: easing }}
        {...props}
      >
        {icon && iconPosition === "start" && <IconSlot>{icon}</IconSlot>}
        {children}
        {icon && iconPosition === "end" && <IconSlot>{icon}</IconSlot>}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export interface LinkButtonProps
  extends SharedProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> {
  href: string;
}

/**
 * Use for navigation/CTAs: Call Now (tel:), WhatsApp (https://wa.me/...),
 * anchor jumps (#services), external/internal links. Same visual system
 * as `Button` — identical variants/sizes — just a semantically correct <a>.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps & HTMLMotionProps<"a">>(
  (
    { className, variant = "primary", size = "md", icon, iconPosition = "end", fullWidth, children, href, ...props },
    ref
  ) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={buttonClassName(variant, size, fullWidth, className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: duration.fast, ease: easing }}
        {...props}
      >
        {icon && iconPosition === "start" && <IconSlot>{icon}</IconSlot>}
        {children}
        {icon && iconPosition === "end" && <IconSlot>{icon}</IconSlot>}
      </motion.a>
    );
  }
);
LinkButton.displayName = "LinkButton";
