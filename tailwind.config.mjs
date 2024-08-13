import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  plugins: [typographyPlugin, formsPlugin],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter Variable", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
};
