/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'sans' : ['Roboto', 'sans-serif'],
      'serif' : ['Roboto Slab', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}