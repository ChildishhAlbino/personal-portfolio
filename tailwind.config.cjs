/** @type {import("tailwindcss").Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "mobile": "1px",
      "laptop": "1024px",
      "desktop": "1280px"
    },
    extend: {
      gridTemplateColumns: {
        "blog-post-template": "1fr clamp(600px, 60vw, 1200px) 1fr"
      },
      fontSize: {
        "hero": "clamp(3rem,5.5vw,8rem)",
        "res-title-xl": "clamp(1.25rem,4.5vw,6rem)",
        "res-title-l": "clamp(1.125rem,3.5vw,4rem)",
        "res-title-md": "clamp(1.125rem,3vw,3rem)",
        "res-title-sm": "clamp(1rem,2.5vw,2rem)",
        "res-title-xs": "clamp(0.8rem,2vw,1.5rem)"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text"),
            "--tw-prose-headings": theme("colors.text"),
            "--tw-prose-body": theme("colors.text"),
            "--tw-prose-lead": theme("colors.text"),
            "--tw-prose-links": theme("colors.fuchsia.500"),
            "--tw-prose-bold": theme("colors.text"),
            "--tw-prose-counters": theme("colors.text"),
            "--tw-prose-bullets": theme("colors.text"),
            "--tw-prose-hr": theme("colors.text"),
            "--tw-prose-quotes": theme("colors.text"),
            "--tw-prose-quote-borders": theme("colors.text"),
            "--tw-prose-captions": theme("colors.text"),
            "--tw-prose-code": theme("colors.text"),
            "--tw-prose-pre-code": theme("colors.text"),
            "--tw-prose-pre-bg": theme("colors.text"),
            "--tw-prose-th-borders": theme("colors.text"),
            "--tw-prose-td-borders": theme("colors.text"),
            "--tw-prose-invert-body": theme("colors.text"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.text"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.text"),
            "--tw-prose-invert-bullets": theme("colors.text"),
            "--tw-prose-invert-hr": theme("colors.text"),
            "--tw-prose-invert-quotes": theme("colors.text"),
            "--tw-prose-invert-quote-borders": theme("colors.text"),
            "--tw-prose-invert-captions": theme("colors.text"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.text"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.text"),
            "--tw-prose-invert-td-borders": theme("colors.text")
          }
        }
      }),
      fontFamily: {
        "sans": ["var(--google-font-family-noto)"],
        "hacker": ["var(--google-font-family-jb)"],
      },
      colors: {
        "darkest": "#0C0032",
        "darker": "#190061",
        "base": "#240090",
        "light": "#3500D3",
        "bright": "#4000FF",
        "text": "#F5EFFF",
        "text-darker": "#DBD7E2"
      },
      backgroundImage: {
        "dots": "radial-gradient(rgba(25, 0, 97, 0.4) 8%, transparent 2%)",
        "grid": "var(--bg-grid-linear-gradient)"
      },
      keyframes: {
        characteristics_entry: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 100 }
        }
      },
      animation: {
        characteristics_entry: "characteristics_entry 1.5s ease-in-out 1 1.5s forwards"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
