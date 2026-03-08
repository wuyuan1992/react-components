import type { Config } from "tailwindcss";

// Tailwind v4 uses CSS-first configuration via @theme inline in globals.css.
// Colors, radii, and dark mode are defined there — this file only configures
// content paths and plugins that cannot be expressed in CSS.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
