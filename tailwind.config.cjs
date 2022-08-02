/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'mobile': '280px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        "primary": "#F6FFF8",
        "secondary": "#EAF4F4",
        "tertiary": "#CCE3DE",
        "accent": "#A4C3B2",
        "highlight": "#6B9080"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
