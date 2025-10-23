/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7f4',
          100: '#f3ede4',
          200: '#e7dbc9',
          300: '#d6c0a1',
          400: '#c5a479',
          500: '#b38b5b',
          600: '#9d7549',
          700: '#835f3e',
          800: '#6c4f36',
          900: '#5a422e',
        },
        beige: {
          50: '#faf9f7',
          100: '#f5f2ed',
          200: '#e8e3d9',
          300: '#dad1c2',
          400: '#cabfab',
          500: '#b5a68f',
          600: '#9d8c73',
          700: '#7e6f5c',
          800: '#675d4d',
          900: '#564e41',
        }
      },
    },
  },
  plugins: [],
}
