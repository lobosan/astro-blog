import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      vfContainerId: z.number(),
      image: image(),
      title: z.string(),
      excerpt: z.string(),
      author: z.object({ id: z.number(), name: z.string(), avatar: image() }),
      topics: z.array(z.object({ id: z.number(), name: z.string() })),
      pubDate: z.date(),
      productDemo: z.string().optional(),
      vfConversations: z.boolean().optional(),
    }),
});

export const collections = { posts };
