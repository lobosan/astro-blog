/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  arrowParens: "avoid",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
