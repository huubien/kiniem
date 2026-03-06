/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        romantic: ["'Playfair Display'", 'serif'],
        sans: ["'Lato'", 'sans-serif'],
      },
      animation: {
        'float':      'float 3s ease-in-out infinite',
        'twinkle':    'twinkle 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.3' },
          '50%':     { opacity: '1' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
