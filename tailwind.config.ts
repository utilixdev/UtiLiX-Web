import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        utilix: {
          violet: "#6D28D9", // Color principal de UtiLiX
          green: "#10B981",  // Color de acento
          dark: "#050505",
        },
      },
    },
  },
  plugins: [],
};
export default config;