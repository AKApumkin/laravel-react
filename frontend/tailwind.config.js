/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#34485c',
        'secondary-color': '#fff',
        'cta-color': '#ff4d72'
      },
    },
  },
  plugins: [],
}