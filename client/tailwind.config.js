/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      arial: ['Arial', 'Sans-serif'],
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
