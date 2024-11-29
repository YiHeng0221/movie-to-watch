import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "#1b1b1b",
        component: "#3B3B3B",
        "component-hover": "#4F4F4F",
        red: "#A11E15",
        "red-hover": "#801810",
        light: "#909090",
      },
      group: {
        hover: "group-hover",
      },
    },
  },
  plugins: [],
} satisfies Config;
