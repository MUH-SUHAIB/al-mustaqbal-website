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
        },

        secondary: {
          DEFAULT: "#C9A860", // Signature Gold
          foreground: "#172B23",
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
      },

      boxShadow: {
        subtle:
          "0 2px 8px -2px rgba(28, 75, 58, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.03)",

        elevated:
          "0 12px 32px -8px rgba(28, 75, 58, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",

        "brand-float":
          "0 10px 35px -12px rgba(28, 75, 58, 0.35)",
      },

      transitionTimingFunction: {
        "brand-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  plugins: [],
};

export default config;