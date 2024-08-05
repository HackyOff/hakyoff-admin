/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 3s linear infinite",
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        md: "3px 3px 6px rgba(0, 0, 0, 0.5)",
        lg: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      },
      colors: {
        primary: "#FFC700",
        dark: "#0E1014",
        violet: "#825EEE",
        secondary: "#C9C9C9",
        team: "#101217",
      },
      container: {
        center: true,
        padding: "15px",
        screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1200px",
          "2xl": "1400px",
        },
      },
      boxShadow: {
        brutal: "-4px 4px 0 0 #DFAE00", // Definindo a sombra sem blur
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow": {
          "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          "text-shadow": "3px 3px 6px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          "text-shadow": "5px 5px 10px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-none": {
          "text-shadow": "none",
        },
      });
    },
  ],
};
