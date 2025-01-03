/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'button-blue' : '#414FF4'
      },
      fontFamily: {
        'inter' : 'Inter'
      },
      
    },
  },
  plugins: [],
};
