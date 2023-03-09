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
          '50': '#f1f3ff',
          '100': '#e6eaff',
          '200': '#d0d8ff',
          '300': '#abb7ff',
          '400': '#7c8aff',
          '500': '#474fff',
          '600': '#2321ff',
          '700': '#110de7',
          '800': '#0f0ccb',
          '900': '#0f0ca6',
      },
      }
    },
  },
  plugins: [],
}
