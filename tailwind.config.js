/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sst: {
          50: '#effaf3',
          100: '#d9f3e2',
          200: '#b5e7c8',
          300: '#82d3a5',
          400: '#4cb97d',
          500: '#279d5f',
          600: '#1a7f4b',
          700: '#16663e',
          800: '#155134',
          900: '#13432c',
          950: '#082517',
        },
        ink: {
          DEFAULT: '#1b2a38',
          soft: '#33475b',
          muted: '#5b6b7a',
        },
        alerte: '#c8401a',
        vigilance: '#f2a900',
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        display: ['"Nunito"', '"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 60, 36, 0.06), 0 4px 16px rgba(16, 60, 36, 0.06)',
      },
    },
  },
  plugins: [],
};
