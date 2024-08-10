import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    vfContainerId: z.number(),
    image: z.string(),
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
  }),
});

export const collections = { blog };
