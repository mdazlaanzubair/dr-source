/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#555555",
        primary: "#212121",
        background: "#f8f8f8",
        surface: "#ffffff",
        accent: "#8c14ff",
      },
    },
  },
  plugins: [],
};
