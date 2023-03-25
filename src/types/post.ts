import { z } from 'zod'

export const PostShape = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publicationDate: z.string(),
  latestEdit: z.string(),
  keywords: z.string().array(),
  thumbnail: z.object({
    url: z.string(),
  }),
})

export type Post = z.infer<typeof PostShape>
