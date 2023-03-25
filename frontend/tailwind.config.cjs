/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('assets/images/headerorigami.jpg')",
        contact: "url('assets/images/contactphoto.jpg')",
        myaccount: "url('assets/images/myaccountphoto.jpg')",
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
}
