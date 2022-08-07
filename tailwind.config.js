const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  // content: ["./src/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./src/layouts/MainLayout.tsx",
    "./src/pages/index.tsx",
    "./src/pages/tributes/index.tsx",
    "./src/pages/leaderboard/index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CB4EFB",
        primaryLight: "#E4A4FD",
        background: "#292929",
        main: "#FEFFFE",
        sub: "#807D78",
        accent: "#9875F5",
        link: "#9875F5",
      },
      fontFamily: {
        sans: ["NEURIAL GROTESK", "sans-serif"],
        mono: ["EPILOGUE", "mono"],
        robo: ["ROBOTO MONO", "mono"],
      },
      screens: {
        "2xl": "2000px",
      },
    },
  },
  plugins: [],
};
