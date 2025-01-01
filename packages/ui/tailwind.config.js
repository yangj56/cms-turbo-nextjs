/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFD466',    // Lighter gold
          DEFAULT: '#FFAB00',  // Main brand gold
          dark: '#B77A00',     // Darker gold
        },
        secondary: {
          light: '#BBC3CF',    // Lighter blue-grey
          DEFAULT: '#556879',  // Main blue-grey
          dark: '#2D3A47',     // Darker blue-grey
        },
        accent: {
          light: '#FFB088',    // Lighter orange
          DEFAULT: '#FF7733',  // Main orange
          dark: '#BF4516',     // Darker orange
        },
        background: {
          light: '#FFFFFF',    // Pure white
          DEFAULT: '#F5F5F5',  // Light grey
          dark: '#E6E6E6',     // Darker grey
        }
      },
    },
  },
  plugins: [],
}
