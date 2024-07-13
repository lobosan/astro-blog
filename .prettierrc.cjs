/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 120,
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
