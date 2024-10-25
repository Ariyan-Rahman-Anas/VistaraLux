/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // myBlue: "blue",
        myBlue: "#0866ff",
        myRed: "red",
        customGreen: "hsl(120, 60%, 70%)",
      },
    },
  },
  plugins: [],
};