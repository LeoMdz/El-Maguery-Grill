/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        stone: {
          950: '#0c0a09',
          900: '#1c1917',
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      boxShadow: {
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-out forwards',
      },
    },
  },
  plugins: [],
};