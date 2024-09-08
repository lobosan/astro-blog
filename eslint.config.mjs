import eslint from "@eslint/js";
import typescriptEslintParser from "@typescript-eslint/parser";
import astroEslintParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptEslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,ts,astro}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        node: true,
        es2022: true,
        browser: true,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".astro"],
      },
    },
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        project: "./tsconfig.json",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "error",
    },
  },
  {
    files: ["**/*.astro/*.js", "*.astro/*.js"],
    languageOptions: {
      parser: typescriptEslintParser,
    },
  },
  {
    ignores: [".astro/", ".github/", "dist/", "node_modules/"],
  },
];
