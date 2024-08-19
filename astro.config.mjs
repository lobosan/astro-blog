import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  build: { inlineStylesheets: "always" },
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    sentry({
      dsn: "https://658ce450b87f680796e13c1c0bc1440e@o4507788070617088.ingest.us.sentry.io/4507788071927808",
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
