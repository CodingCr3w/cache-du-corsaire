/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bangers: ["Bangers", "cursive"],
      },
      colors: {
        surface: {
          900: "#0b132b",
          700: "#18213D",
          500: "#1c2541",
          300: "#345074",
        },
        primary: {
          main: "#6fffe9",
          darker: "#5bc0be",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-debug-screens"),
    function ({ addVariant }) {
      addVariant("child", "& > *")
      addVariant("even", "&:nth-child(even)")
      addVariant("odd", "&:nth-child(odd)")
    },
  ],
}
