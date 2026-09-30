/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF5F6',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        lavender: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
        },
        peach: {
          50: '#FFFBF7',
          100: '#FFEDD5',
          200: '#FFDAB9',
          300: '#FDBA74',
          400: '#FB923C',
        },
        cream: {
          50: '#FFFCF8',
          100: '#FFF7ED',
          200: '#FFEDD5',
        },
        gold: {
          100: '#FFF9E6',
          200: '#FFF0BF',
          300: '#FDE082',
          400: '#F5CB4A',
          500: '#D4AF37',
          600: '#B38728',
          700: '#8C6718',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'romantic-pink': '0 10px 30px -5px rgba(244, 63, 94, 0.16), 0 4px 15px -2px rgba(251, 113, 133, 0.12)',
        'soft-white': '0 8px 30px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(244, 63, 94, 0.08)',
        'polaroid-pink': '0 10px 25px rgba(244, 63, 94, 0.12), 0 3px 8px rgba(0, 0, 0, 0.05)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'pink-romantic': 'linear-gradient(135deg, #FFF7ED 0%, #FFE4E6 45%, #E9D5FF 85%, #FFDAB9 100%)',
        'pink-watercolor': 'linear-gradient(135deg, #FFF1F2 0%, #FAF5FF 50%, #FFF8F1 100%)',
      }
    },
  },
  plugins: [],
}
