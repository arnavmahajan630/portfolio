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
        background: "var(--ink)",
        foreground: "var(--bone)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        bone: {
          DEFAULT: "var(--bone)",
          dim: "var(--bone-dim)",
        },
        rule: {
          DEFAULT: "var(--rule)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          glow: "var(--amber-glow)",
        },
        ok: {
          DEFAULT: "var(--ok)",
          glow: "var(--ok-glow)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
