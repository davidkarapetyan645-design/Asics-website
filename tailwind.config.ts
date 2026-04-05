import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "radial-grid":
          "linear-gradient(rgba(255,255,255,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.075) 1px, transparent 1px)",
      },
      boxShadow: {
        hero: "0 38px 120px rgba(3, 7, 18, 0.5)",
        glow: "0 0 80px rgba(125, 211, 252, 0.22)",
      },
      fontFamily: {
        body: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
