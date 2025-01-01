/** @type {import('tailwindcss').Config} */
const baseConfig = require("@repo/ui/tailwind.config.js");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",  // Add UI package components
  ],
  ...baseConfig,
}
