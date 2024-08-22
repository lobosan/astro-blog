import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  build: { inlineStylesheets: "always" },
  integrations: [tailwind({ applyBaseStyles: false })],
});
