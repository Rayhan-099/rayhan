import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eclipse: {
          black: "#110D13",
          surface: "#17121A",
          elevated: "#1E1822",
        },
        burgundy: {
          DEFAULT: "#42151F",
          muted: "#311017",
          glow: "#5E1E2C",
        },
        crimson: {
          DEFAULT: "#A51F30",
          hover: "#BD2437",
          muted: "#7A1724",
        },
        ember: {
          DEFAULT: "#FF493D",
          hover: "#FF665C",
          dim: "#D93B30",
        },
        porcelain: {
          DEFAULT: "#F5E8E8",
          dim: "#DEC8C8",
          ghost: "#FAF2F2",
        },
        steel: {
          DEFAULT: "#A9A5B2",
          dark: "#8E8A97",
          light: "#C7C4CF",
        },
        gunmetal: {
          DEFAULT: "#29252E",
          border: "#3B3542",
          surface: "#211D25",
        },
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        mono: ["Chivo Mono", "monospace"],
        display: ["'Dela Gothic One'", "Syne", "sans-serif"],
        chakra: ["'Chakra Petch'", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.15em",
        telemetry: "0.2em",
      },
      lineHeight: {
        headline: "0.85",
        section: "0.90",
      },
    },
  },
  plugins: [],
};

export default config;
