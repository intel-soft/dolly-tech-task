/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundLight: "rgba(255, 255, 255, 1)",
        foregroundLight: "rgba(0, 0, 0, 1)",
        backgroundDark: "rgba(55, 65, 81, 1)",
        foregroundDark: "rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [],
};
