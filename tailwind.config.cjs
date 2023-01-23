/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'mobile': '280px',
      // => @media (min-width: 280px) { ... }

      'mobile-lg': '500px',

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        "primary": "#F5EFFF",
        "secondary": "#E5D9F2",
        "tertiary": "#CDC1FF",
        "accent": "#A594F9",
        "highlight": "#483ED5"
      },
      backgroundImage: {
        "lm-page-curve": "url('/layered-waves-haikei.svg')",
        "header-curve": "url('/header-curve.svg')"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
