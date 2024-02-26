/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          900: "#0D0D0D",
          800: "#171717",
          700: "#262626",
          600: "#3D3D3F",
          300: "#9B9B9B",
          200: "#f9f9f9",
          100: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
