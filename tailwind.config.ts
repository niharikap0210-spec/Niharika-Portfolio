import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F9F8F7",
        surface: "#FFFFFF",
        "ink-900": "#111110",
        "ink-700": "#3A3937",
        "ink-500": "#737270",
        "ink-300": "#B0AEAC",
        "ink-100": "#E5E4E0",
        violet: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dark: "#5B21B6",
          muted: "#EDE9FE",
        },
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.03em",
        tight: "-0.02em",
        snug: "-0.01em",
      },
      lineHeight: {
        body: "1.7",
        relaxed: "1.6",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(124,58,237,0.05)",
        "card-hover": "0 2px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(124,58,237,0.12)",
        nav: "0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "violet-sm": "0 0 0 3px rgba(124,58,237,0.12)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
