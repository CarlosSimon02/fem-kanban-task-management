import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "40em",
      md: "44em",
      lg: "64em",
      xl: "80em",
      "2xl": "96em",
    },
    fontSize: {
      xs: ["0.75rem", "1"],
      sm: ["0.8125rem", "1.4375rem"],
      base: ["1rem", "1.5"],
      lg: ["1.125rem", "1.5"],
      xl: ["1.25rem", "1.75"],
      "2xl": ["1.5rem", "2"],
      "3xl": ["1.875rem", "2.25"],
      "4xl": ["2.25rem", "2.5"],
      "5xl": ["3rem", "1"],
      "6xl": ["3.75rem", "1"],
      "7xl": ["4.5rem", "1"],
      "8xl": ["6rem", "1"],
      "9xl": ["8rem", "1"],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          hover: "hsl(var(--destructive-hover))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "new-column-bg": "var(--new-column-bg)",
      },
      keyframes: {
        "sidebar-slide-in": {
          from: { "margin-left": "-19.375rem" },
          to: { "margin-left": "0" },
        },
        "sidebar-slide-out": {
          from: { "margin-left": "0" },
          to: { "margin-left": "-19.375rem" },
        },
      },
      animation: {
        "sidebar-slide-in": "sidebar-slide-in 150ms ease-out",
        "sidebar-slide-out": "sidebar-slide-out 150ms ease-out",
      },
      fontFamily: {
        plusJakartaSans: "'Plus Jakarta Sans', sans-serif",
      },
      boxShadow: {
        "card-shadow": "var(--card-shadow)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
