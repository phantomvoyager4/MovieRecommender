/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FBEAE7',     
          red: '#FD4148',     
          dark: '#36312F',    
          green: '#75C87A',
          pink: '#FD868A',
          purple: '#BC88FF',
          cyan: '#5DCAB5',
        }
      },
    },
  },
  plugins: [],
}