/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-violet': {
          '50': '#f5f2ff',
          '100': '#ece8ff',
          '200': '#dbd4ff',
          '300': '#c0b2ff',
          '400': '#a286ff',
          '500': '#8556fc',
          '600': '#7d3df5',
          '700': '#6721e0',
          '800': '#571bbc',
          '900': '#48189a',
      },
      }
    },
  },
  plugins: [],
}
