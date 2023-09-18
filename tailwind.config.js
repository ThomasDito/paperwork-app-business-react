const theme = require("paperwork-ui/lib/config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [...theme.default.darkMode],
  content: [
    "../paperwork-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html",
  ],
  theme: {
    ...theme.default.theme,
  },
  plugins: [...theme.default.plugins],
};