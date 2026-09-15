import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0C",
        "bg-2": "#111114",
        panel: "#16161A",
        ink: "#ECE9E2",
        "ink-dim": "#8D8B86",
        "ink-faint": "#57564F",
        accent: "#8C7BFF",
        "accent-soft": "rgba(140, 123, 255, 0.14)",
        ok: "#63E6BE",
        line: "rgba(236, 233, 226, 0.09)",
        "line-strong": "rgba(236, 233, 226, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "18px",
        card: "18px",
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        widestMono: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
