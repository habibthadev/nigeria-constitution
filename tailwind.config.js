/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        body: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#008751',
          dark: '#00b368',
          hover: '#006b41',
          'dark-hover': '#00d97e',
        },
      },
    },
  },
}
