/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "synthwave",
      "halloween",
      "forest",
      "black",
      "business",
      "night",
      "coffee",
    ],
  },
  plugins: [require("daisyui")],
};
