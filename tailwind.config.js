/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        poppins:["Poppins-Regular", 'sans-serif'],
        "poppins-bold": ["Poppins-Bold", 'sans-serif'],
        "poppins-light": ["Poppins-Light", 'sans-serif'],
        "poppins-medium": ["Poppins-Medium", 'sans-serif'],
        "poppins-semibold": ["Poppins-SemiBold", 'sans-serif'],
        "poppins-extrabold": ["Poppins-ExtraBold", 'sans-serif'],
      },
      colors:{
        "primary": {
          100: "#EC324E0A",
          200: "#EC324E1A",
          300: "#EC324E",
        },
        accent:{
          100:"#FBFBFD",
        },
        black:{
          DEFAULT:"#000000",
          100:"#8C8E98",
          200:"#666876",
          300:"#191d31",
        },
        danger:"#F75555"

      }
    },
  },
  plugins: [],
}
