/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: [
        '"Open Sans"',
        '"Zen Kaku Gothic New"',
        '"\u6E38\u30B4\u30B7\u30C3\u30AF\u4F53"',
        'YuGothic',
        '"\u6E38\u30B4\u30B7\u30C3\u30AF"',
        '"Yu Gothic Medium"',
        '"\u6E38\u30B4\u30B7\u30C3\u30AF Medium"',
        '"Hiragino Sans"',
        '"\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 Pro W3"',
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Kaku Gothic Pro"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        '"Segoe UI"',
        '"Noto Sans Japanese"',
        'Meiryo',
        'sans-serif',
        '"Noto Sans JP"',
        'ui-sans-serif',
        'system-ui',
      ],
      display: ['var(--font-playfair)', 'serif'],
    },
    extend: {
      colors: {
        primary: '#005bac',
        secondary: '#e5e7eb',
        light: '#222426',
        dark: '#d1d5db',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.3s ease-in-out forwards',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            p: {
              fontWeight: '400',
              lineHeight: '1.75',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
