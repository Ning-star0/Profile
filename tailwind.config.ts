import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18191f",
        bark: "#7d6f5f",
        sage: "#68784a",
        moss: "#6f8f2e",
        leaf: "#9fbd31",
        mist: "#f7f6f1",
        paper: "#fffefb",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 22px 80px rgba(70, 77, 55, 0.14)",
        ring: "0 0 0 1px rgba(85, 101, 61, 0.12), 0 22px 50px rgba(58, 67, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
