/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        xp: ['Tahoma', 'Verdana', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
