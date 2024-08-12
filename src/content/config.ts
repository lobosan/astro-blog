import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      vfContainerId: z.number(),
      image: image(),
      title: z.string(),
      excerpt: z.string(),
      author: z.object({
        name: z.string(),
        avatar: image(),
      }),
      pubDate: z.date(),
    }),
});

export const collections = { blog };
