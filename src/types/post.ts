import { z } from 'zod'

export const PostAggregationShape = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publicationDate: z.string(),
    latestEdit: z.string(),
    keywords: z.string().array(),
    thumbnail: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
        details: z.any(),
    }),
})

export type PostAggregation = z.infer<typeof PostAggregationShape>

export const PostShape = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publicationDate: z.string(),
    latestEdit: z.string(),
    keywords: z.string().array(),
    serializedMdx: z.any(),
    thumbnail: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
        details: z.any(),
    }),
})

export type Post = z.infer<typeof PostShape>
