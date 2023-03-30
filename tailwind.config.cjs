/** @type {import("tailwindcss").Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'mobile': '280px',
      // => @media (min-width: 280px) { ... }
      'mobile-lg': '500px',
      // => @media (min-width: 500px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        "blog-post-template": "1fr clamp(600px, 60vw, 1200px) 1fr"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-body': theme('colors.text'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-lead': theme('colors.text'),
            '--tw-prose-links': theme('colors.light'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-counters': theme('colors.text'),
            '--tw-prose-bullets': theme('colors.text'),
            '--tw-prose-hr': theme('colors.text'),
            '--tw-prose-quotes': theme('colors.text'),
            '--tw-prose-quote-borders': theme('colors.text'),
            '--tw-prose-captions': theme('colors.text'),
            '--tw-prose-code': theme('colors.text'),
            '--tw-prose-pre-code': theme('colors.text'),
            '--tw-prose-pre-bg': theme('colors.text'),
            '--tw-prose-th-borders': theme('colors.text'),
            '--tw-prose-td-borders': theme('colors.text'),
            '--tw-prose-invert-body': theme('colors.text'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.text'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.text'),
            '--tw-prose-invert-bullets': theme('colors.text'),
            '--tw-prose-invert-hr': theme('colors.text'),
            '--tw-prose-invert-quotes': theme('colors.text'),
            '--tw-prose-invert-quote-borders': theme('colors.text'),
            '--tw-prose-invert-captions': theme('colors.text'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.text'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.text'),
            '--tw-prose-invert-td-borders': theme('colors.text'),
          },
        },
      }),
      fontFamily: {
        "sans": ['var(--next-google-font-space)']
      },
      colors: {
        "darkest": "#0C0032",
        "darker": "#190061",
        "base": "#240090",
        "light": "#3500D3",
        "neutral-dark": "#282828",
        "text": "#F5EFFF",
        "text-darker": "#C2CAD0"

      },
      backgroundImage: {
        "dots": "radial-gradient(rgba(25, 0, 97, 0.7) 8%, transparent 2%)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
