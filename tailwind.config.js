/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3490dc', // Custom color with hex value
        'gray': '#303030',
        'dark': '#141416',
        'dark-gray': ' #1e1e1e', 
        'yellow': '#e3bf00',
        'gray-yellow': '#242420',
        'gray-medium': '#404040',
        'text-gray': '#929292',
        'text-light-grey' : '#c1c1c1',
        'whitish':'#ededed',
        'disabled-gray': '#5a5a5a',
        'hoveryellow':'#e4d26f',
        'red': '#ff0000',
      },
      filter: { // extending the filter utility
        'blur': 'blur(2px)', // custom blur class
      },
      blur: {
        'tiny': '1px',
      },
      fontFamily: {
        primary: ['PrimaryFont', 'sans-serif'],
        secondary: ['SecondaryFont', 'W95FA'],
      },
    },
  },
  plugins: [
  ],
}