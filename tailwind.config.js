module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'header': '12%, 12%, 50.5%, 15%',
        'profile': '37%, 70%'
      }
    },
  },
  plugins: [],
}
