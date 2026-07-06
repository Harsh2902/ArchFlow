import type { Config } from "tailwindcss";

/**
 * ArchFlow brand system — derived from the logo:
 * rich black canvas, metallic silver-white, royal-blue "flow" gradient.
 *
 * `flow` is the brand blue scale. `emerald` is intentionally remapped to
 * the same blues as a hard safety net: no legacy emerald class can ever
 * render green again.
 */
const flow = {
  50: "#eef0ff",
  100: "#e0e4ff",
  200: "#c4cbff",
  300: "#a5b0ff",
  400: "#8a96ff",
  500: "#5865f2",
  600: "#4353f0",
  700: "#3340d4",
  800: "#2b35c4",
  900: "#232a9e"
};

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "5rem"
      },
      screens: { "2xl": "1280px" }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        flow,
        // Legacy-class safety net — emerald classes now render brand blue.
        emerald: {
          300: flow[300],
          400: flow[400],
          500: flow[500],
          600: flow[600],
          700: flow[700]
        }
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem"
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.025em",
        eyebrow: "0.14em"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
