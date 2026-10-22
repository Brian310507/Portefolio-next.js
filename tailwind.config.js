/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
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
      fontFamily: {
        display: ["var(--font-display)", "Chakra Petch", "sans-serif"],
        sans: ["var(--font-sans)", "Rajdhani", "sans-serif"],
      },
      boxShadow: {
        // Aides-mémoire de glow : rouges (primaire) et cyans (interactif)
        "neon-acid": "0 0 18px rgba(255, 29, 61, 0.5)",
        "neon-cyan": "0 0 18px rgba(77, 232, 232, 0.5)",
        "neon-pink": "0 0 18px rgba(255, 51, 85, 0.5)",
      },
    },
    colors: {
      ...colors,
      // Anciens raccourcis conservés pour compatibilité
      primary: colors.blue,
      secondary: colors.violet,
      // Palette interface Cyberpunk 2077 (menus in-game)
      // ⚠️ noms historiques conservés : "acid" = rouge, "toxic" = cyan clair
      acid: {
        // Rouge crimson : labels, bordures, primaire
        DEFAULT: "#FF1D3D",
        dim: "#C7102B",
      },
      toxic: {
        // Cyan clair : états actifs / positifs (toggle ON)
        DEFAULT: "#66EDED",
        bright: "#4DE8E8",
      },
      neon: {
        cyan: "#4DE8E8",
        pink: "#FF3355",
        orange: "#FF7A4D",
      },
      night: {
        // Noirs bordeaux (fonds des menus)
        950: "#0A0306",
        900: "#12060A",
        800: "#1A090E",
        700: "#240C12",
        600: "#33111A",
      },
    },
  },
  plugins: [],
};
