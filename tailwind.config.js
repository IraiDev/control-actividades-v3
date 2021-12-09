module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      maxHeight: {
        'res': '85vh',
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'lg': '#edebe9',
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
