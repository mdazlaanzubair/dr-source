/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#6b7280b3",
        primary: "#252525",
        background: "#f9fafb",
        surface: "#ffffff",
        accent: "#01adef",
      },
    },
  },
  plugins: [],
};
