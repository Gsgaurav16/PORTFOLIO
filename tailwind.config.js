/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-yellow': '#FFF7B2',
        'retro-green': '#004E45',
        'retro-orange': '#FF8A00',
        'retro-dark': '#1a1a1a',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'body': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'retro': '0 4px 0 0 rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)',
        'retro-glow': '0 0 20px rgba(255, 138, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

