/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-page': "url('/src/static/images/landing-page.png')",
        'list-dark': "url('/src/static/images/list-dark.svg')",
        'list': "url('/src/static/images/list.svg')",
        'graph': "url('/src/static/images/graph.svg')",
        'landing-dark': "url('/src/static/images/landing-dark.svg')",
        'graph-dark': "url('/src/static/images/graph-dark.svg')",
      },
      colors: {
        'darkTheme': 'rgb(38,39,42)',
        'primary': 'rgb(250 204 21)',
        'dark': 'rgb(24 24 27)',
      }
    },
  },
  plugins: [],
}