/** @type {import("tailwindcss").Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  // darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      "mobile": "1px",
      "laptop": "1024px",
      "desktop": "1280px"
    },
    extend: {
      minWidth: {
        "entire-website": "320px"
      },
      fontSize: {
        "hero": "clamp(3rem,5.5vw,8rem)",
        "res-title-l": "clamp(1.6rem, 2.5vw + 1rem, 6rem)",
        "res-title-md": "clamp(1.4rem, 2vw + 1rem, 4rem)",
        "res-title-sm": "clamp(1rem, 1.5vw + 1rem, 2rem)"
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
        "text-darker": "#DBD7E2",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "dots": "radial-gradient(rgba(25, 0, 97, 0.4) 8%, transparent 2%)",
        "grid": "var(--bg-grid-linear-gradient)"
      },
      keyframes: {
        characteristics_entry: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 100 }
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        characteristics_entry: "characteristics_entry 1.5s ease-in-out 1 1.5s forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate")
  ]
};
