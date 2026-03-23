/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0b",
        surface: "#111111",
        gold: "#d4af37",
        accent: "#facc15",
        border: "#2a2a2a",
      },
    },
  },
  plugins: [],
};
