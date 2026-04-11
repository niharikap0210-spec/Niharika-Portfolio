import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Backgrounds */
        "bg-primary": "#FAFAFA",
        "bg-secondary": "#F0F0F0",
        "bg-elevated": "#FFFFFF",
        /* Text */
        "text-primary": "#1A1A1A",
        "text-secondary": "#6B6B6B",
        "text-muted": "#9CA3AF",
        /* Accent */
        accent: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dark: "#5B21B6",
        },
        /* Borders */
        border: "#E5E5E5",
        "border-light": "#F0F0F0",
        /* Status */
        "status-green": "#10B981",
        "selection-blue": "#58B4F0",
        /* Backwards compat aliases */
        bg: "#FAFAFA",
        surface: "#FFFFFF",
        "ink-900": "#1A1A1A",
        "ink-700": "#3A3A3A",
        "ink-500": "#6B6B6B",
        "ink-300": "#9CA3AF",
        "ink-100": "#E5E5E5",
        violet: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dark: "#5B21B6",
          muted: "rgba(124,58,237,0.07)",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'Menlo', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        display: "-0.02em",
        tight: "-0.02em",
        snug: "-0.01em",
        wide: "0.1em",
        wider: "0.15em",
      },
      lineHeight: {
        body: "1.7",
        relaxed: "1.6",
        tight: "1.1",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(124,58,237,0.05)",
        "card-hover": "0 4px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(124,58,237,0.12)",
        nav: "0 1px 0 rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)",
        "violet-sm": "0 0 0 3px rgba(124,58,237,0.12)",
        "float": "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
