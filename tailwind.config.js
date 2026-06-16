/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep-blue primary palette
        navy: {
          950: '#06101f', // near-black with blue cast — darkest section bg
          900: '#0b1a2f', // very dark navy — alternating section bg
          800: '#0f2d5e', // deep blue — Navbar, Footer, key surfaces
          700: '#1a3a72', // medium navy — card/elevated backgrounds
          600: '#1f4a8c', // lighter navy — reserved for future use
        },
        // Vibrant green accent
        accent: {
          DEFAULT: '#00C48C', // primary accent — buttons, highlights, icons
          light:   '#1cd9a0', // hover state on accent elements
          dark:    '#009a6e', // pressed / active state
        },
      },
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-up-1': 'fade-up 0.7s 0.10s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-up-2': 'fade-up 0.7s 0.20s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-up-3': 'fade-up 0.7s 0.30s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-in':   'fade-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
};
