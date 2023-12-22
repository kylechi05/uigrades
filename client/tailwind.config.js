/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing': "url('/src/static/images/landing.svg')",
        'list-dark': "url('/src/static/images/list-dark.svg')",
        'list': "url('/src/static/images/list.svg')",
        'graph': "url('/src/static/images/graph.svg')",
        'landing-dark': "url('/src/static/images/landing-dark.svg')",
        'graph-dark': "url('/src/static/images/graph-dark.svg')",
      },
      colors: {
        'darkTheme': 'rgb(38,39,42)'
      }
    },
  },
  plugins: [],
}