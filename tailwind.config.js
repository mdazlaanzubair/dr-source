/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#9CA3AF",
        primary: "#F3F4F6",
        background: "#030712",
        surface: "#111827",
        accent: "#0BA5E9",
      },
    },
  },
  plugins: [],
};
