import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 80px -32px rgba(8, 24, 45, 0.22)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "soft-pulse": "soft-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
