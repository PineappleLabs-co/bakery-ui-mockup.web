/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkNavy: '#23344C',
        textDark: '#1F2937',
        pineapple: {
          bg: '#F4C430',
          blob: '#FFE89A'
        },
        apple: {
          bg: '#E54B4B',
          blob: '#FFB6A3'
        },
        avocado: {
          bg: '#74A94F',
          blob: '#CBEA9E'
        },
        banana: {
          bg: '#F6D34E',
          blob: '#FFF1B8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'sans-serif'],
        script: ['"Satisfy"', '"Dancing Script"', '"Pacifico"', 'cursive'],
        body: ['"Outfit"', 'sans-serif']
      },
      boxShadow: {
        'btn-inner': 'inset 5px 5px 3px rgba(0, 0, 0, 0.25)',
        'pill-nav': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'pie-shadow': '0 35px 60px -15px rgba(0, 0, 0, 0.35)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
