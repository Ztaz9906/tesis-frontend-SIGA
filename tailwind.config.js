/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


