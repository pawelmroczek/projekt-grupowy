/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [ "./app/**/*.{js,jsx,ts,tsx}","../components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#2A9D8F",
        primaryDark: "#264653",
        secondary: "#E9C46A",
        secondaryDark: "#F4A261",
        secondaryDarker: "#E76F51",
        textPrimary: "#333333",
        textSecondary: "#4F4F4F",
        textTertiary: "#828282",
        textWhite: "#FFFFFF",
      }
    },
  },
  plugins: [],
}

