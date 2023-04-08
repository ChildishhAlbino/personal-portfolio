import { z } from 'zod'

export const PageAggregationShape = z.object({
    title: z.string(),
    mdx: z.string(),
    slug: z.string(),
    css: z.string(),
})

export type PageAggregation = z.infer<typeof PageAggregationShape>

export const PageShape = z.object({
    title: z.string(),
    mdx: z.string(),
    slug: z.string(),
    serializedMdx: z.any(),
    css: z.nullable(z.string()),
})

export type Page = z.infer<typeof PageShape>
