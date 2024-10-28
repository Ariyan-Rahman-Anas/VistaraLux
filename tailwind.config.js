/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ca8fc",
        myBlue: "#0866ff",
        myRed: "red",
        customGreen: "hsl(120, 60%, 70%)",
      },
    },
  },
  plugins: [],
};