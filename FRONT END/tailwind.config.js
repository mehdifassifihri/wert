/** @type {import('tailwindcss').Config} */
module.exports = {
  extend: {
    backgroundImage: {
      'bgimage': "url('/Users/MEHDI/Desktop/wert/FRONT END/src/assets/bgg.jpg')"
    }
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  
  plugins: [],
};
