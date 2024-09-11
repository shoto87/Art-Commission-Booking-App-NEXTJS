// const { default: Nav } = require("./app/(components)/Nav");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      // },
      colors: {
        Nav: "#18222f",
        page: "#2b3441",
        card: "#47566a",
        "card-hover": "#4f5e71",
        "default-text": "#f1f3f5",
        "blue-accent": "#0084d4",
        "blue-accent-hover": "#009fff",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
