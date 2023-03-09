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
          '50': '#f3f6fc',
          '100': '#e6ecf8',
          '200': '#c8d7ef',
          '300': '#97b5e2',
          '400': '#5f8ed1',
          '500': '#3b70bc',
          '600': '#2c5aa4',
          '700': '#234681',
          '800': '#213d6b',
          '900': '#20355a',
      },
      }
    },
  },
  plugins: [],
}
