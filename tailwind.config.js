/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EBF4',
          100: '#C1D0E8',
          200: '#9BB4DB',
          300: '#7598CF',
          400: '#5982C2',
          500: '#3E6CB6',
          600: '#345FAE',
          700: '#294FA5',
          800: '#1E3F9D',
          900: '#1E3A8A',
        },
        accent: {
          50: '#FFF8E6',
          100: '#FEEFC1',
          200: '#FEE69B',
          300: '#FDDC74',
          400: '#FCD34D',
          500: '#FCC026',
          600: '#F59E0B',
          700: '#D97706',
          800: '#B45309',
          900: '#92400E',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};