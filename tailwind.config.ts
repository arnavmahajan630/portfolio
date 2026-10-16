import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070913",
        foreground: "#f3f4f6",
        cyber: {
          dark: "#05070f",
          darker: "#030408",
          card: "rgba(12, 16, 32, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(0, 242, 254, 0.35)",
          cyan: "#00f2fe",
          blue: "#4facfe",
          violet: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow-line": "glowLine 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowLine: {
          "0%": { opacity: "0.3", transform: "scaleX(0.95)" },
          "100%": { opacity: "0.8", transform: "scaleX(1.05)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
