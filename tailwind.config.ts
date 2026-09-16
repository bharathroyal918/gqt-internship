import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B5ED7",
          "blue-hover": "#094bb0",
          "blue-light": "#EBF3FE",
          navy: "#021B49",
          "navy-light": "#0A2F7D",
          "navy-dark": "#010E28",
          gold: "#F59E0B",
          "gold-light": "#FEF3C7",
          success: "#16A34A",
          "success-light": "#DCFCE7",
          danger: "#DC2626",
          "danger-light": "#FEE2E2",
          warning: "#F59E0B",
          slate: "#F8FAFC",
          card: "#FFFFFF",
          text: "#111827",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        "2xl": "20px",
        xl: "14px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(11, 94, 215, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 30px -4px rgba(2, 27, 73, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.05)",
        "soft-xl": "0 20px 40px -6px rgba(2, 27, 73, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "card-hover": "0 12px 28px -4px rgba(11, 94, 215, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
