import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  build: { inlineStylesheets: "always" },
  integrations: [mdx(), tailwind({ applyBaseStyles: false })],
});
