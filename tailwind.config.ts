import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dcefff",
          200: "#bce1ff",
          300: "#87ceff",
          400: "#4ab3fc",
          500: "#1e97ef",
          600: "#0d78db",
          700: "#0b61af",
          800: "#105290",
          900: "#134575",
        },
        mint: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(13, 120, 219, 0.12)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
