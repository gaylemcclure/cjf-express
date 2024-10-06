/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: "#F2F2F2",
      blue: "#02567e",
      yellowAlt: "#E6AF2E",
      yellow: "#ebc41b",
      smoke: "#0C0A09",
      ltBlue: "#077eb7",
      gray: "#F2F2F2",
      ltGray: "#e5e5e9",
      success: "#198754",
    },
    screens: {
      fold: "280px",
      galaxy: "360px",
      se: "375px",
      pro: "390px",
      xr: "412px",
      proMax: "430px",
      five: "500px",
      six: "600px",
      md: "750px",
      tablet: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
      "4xl": "2200px",
    },
    extend: {
      backgroundImage: {
        tickets: "url('/public/old-married-couple.jpg')",
      },
      maxWidth: {
        screenMax: "900px",
      },
    },
  },
  plugins: [],
};
