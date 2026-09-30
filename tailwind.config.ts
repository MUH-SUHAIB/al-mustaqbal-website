import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "var(--font-inter)", "sans-serif"],
      },

      /**
       * NAMED SPACING SCALE
       * -------------------
       * This was completely missing before. Classes like `px-md`, `py-xl`,
       * `gap-2xl` were used across section-shell.tsx and every section
       * component, but Tailwind silently drops any utility it doesn't
       * recognize — it does NOT throw an error. The result: those classes
       * compiled to zero padding/gap, which is why the site looked
       * edge-to-edge / cramped on mobile.
       *
       * This `extend`s (adds to) Tailwind's default numeric spacing scale
       * (p-4, gap-6, etc. all still work exactly as before) — nothing here
       * removes or overrides existing spacing classes anywhere in the app.
       */
      spacing: {
        xs: "0.5rem",   // 8px
        sm: "0.75rem",  // 12px
        md: "1.5rem",   // 24px  — standard mobile section gutter
        lg: "2rem",     // 32px  — standard desktop section gutter
        xl: "3rem",     // 48px
        "2xl": "4rem",  // 64px
        "3xl": "6rem",  // 96px
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        /* Al Mustaqbal Brand Colors */
        primary: {
          DEFAULT: "#1C4B3A", // Deep Bottle Green
          foreground: "#FFFFFF",
          /**
           * NEW — required by button.tsx's `hover:bg-primary-hover`.
           * This class was silently doing nothing before (no hover
           * feedback on primary buttons at all). Shade is a straightforward
           * ~15% darkening of the brand green for a pressed/hover feel —
           * take a look live and tell me if you want it darker/lighter.
           */
          hover: "#163D2F",
        },

        secondary: {
          DEFAULT: "#C9A860", // Signature Gold
          foreground: "#172B23",
          /** NEW — same reasoning as primary.hover, required by button.tsx. */
          hover: "#B8944F",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "#C9A860", // Gold Accent
          foreground: "#172B23",
        },

        card: {
          DEFAULT: "#FFFFFF", // Pure White Cards
          foreground: "#172B23",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",

        card: "1rem",
        section: "1.5rem",

        /**
         * NEW — required by button.tsx's `rounded-button`. Was previously
         * undefined, so every Button/LinkButton rendered with sharp
         * corners unless a component manually overrode it with `!rounded-full`
         * (as Hero's CTAs do). Using the same --radius token keeps buttons
         * visually consistent with cards.
         */
        button: "var(--radius)",
      },

      boxShadow: {
        subtle:
          "0 2px 8px -2px rgba(28, 75, 58, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.03)",

        elevated:
          "0 12px 32px -8px rgba(28, 75, 58, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",

        "brand-float":
          "0 10px 35px -12px rgba(28, 75, 58, 0.35)",

        /**
         * NEW — required by button.tsx's `hover:shadow-hover`. Was
         * previously undefined, so buttons had no shadow lift on hover.
         */
        hover:
          "0 8px 20px -6px rgba(28, 75, 58, 0.25)",
      },

      /**
       * NEW — required by button.tsx's `duration-fast` class. This is a
       * *CSS* transition-duration utility, separate from the JS `duration`
       * object in lib/motion.ts (which drives Framer Motion's `transition`
       * prop). Values are kept in sync with lib/motion.ts on purpose:
       * fast = 0.2s, base = 0.4s, slow = 0.6s — so hover color transitions
       * and Framer Motion scale animations feel like one consistent system.
       */
      transitionDuration: {
        fast: "200ms",
        base: "400ms",
        slow: "600ms",
      },

      transitionTimingFunction: {
        "brand-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [],
};

export default config;