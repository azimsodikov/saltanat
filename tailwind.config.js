/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
          card: '#1E1E1E',
          text: '#FFFFFF',
          accent: '#3B82F6',
        },
      },
    },
  },
  plugins: []
}