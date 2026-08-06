import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          foreground: "var(--color-accent-foreground)",
        },
        border: "var(--color-border)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },

      // Named spacing scale layered on top of Tailwind's default scale.
      // Use alongside p-4/gap-6 etc. — this is for deliberate "breathing
      // room" sections, not a full replacement.
      spacing: {
        xs: "0.5rem",   // 8px
        sm: "0.75rem",  // 12px
        md: "1.25rem",  // 20px
        lg: "2rem",     // 32px
        xl: "3rem",     // 48px
        "2xl": "4rem",  // 64px
        "3xl": "6rem",  // 96px
      },

      borderRadius: {
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        section: "var(--radius-section)",
      },

      boxShadow: {
        subtle: "var(--shadow-subtle)",
        hover: "var(--shadow-hover)",
        elevated: "var(--shadow-elevated)",
      },

      // Timing system for both CSS transitions and Framer Motion
      // (see lib/motion.ts) — keep these two in sync.
      transitionDuration: {
        fast: "200ms",
        base: "400ms",
        slow: "600ms",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
