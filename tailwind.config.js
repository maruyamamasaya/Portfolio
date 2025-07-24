/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        xp: ['Tahoma', 'Verdana', 'sans-serif'],
        digital: ['"Share Tech Mono"', 'monospace'],
        sans: ['"Noto Sans JP"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        primary: '#e60012',
        secondary: '#005bac'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
