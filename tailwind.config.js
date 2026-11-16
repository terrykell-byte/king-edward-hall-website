/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#1B382B',
          'forest-light': '#26503E',
          'forest-dark': '#11251C',
          brass: '#C29B38',
          'brass-hover': '#A9852D',
          'brass-light': '#E6D3A3',
          cream: '#FBF9F5',
          'cream-dark': '#F2ECE1',
          surface: '#FFFFFF',
          'text-dark': '#1F2937',
          'text-muted': '#5B6776',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 56, 43, 0.08)',
        'elevated': '0 12px 30px -4px rgba(27, 56, 43, 0.12)',
      }
    },
  },
  plugins: [],
}
