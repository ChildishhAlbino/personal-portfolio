import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { getPostBySlug, getPosts, getPageBySlug } from '@service/contentful'
import { PostAggregationShape, PostShape, SlugAggregationShape } from '@/types/post'
import { PageShape } from '@/types/page'
import { getPostSlugs } from '@service/contentful/getPostSlugs'
import { getPostAggregationBySlug } from '@service/contentful/getPostAggregationBySlug'

const getPostsInputShape = z.object({})
const getPostsOutputShape = z.object({
    posts: z.array(PostAggregationShape),
})

const getPostSlugsInputShape = z.object({})
const getPostSlugsOutputShape = z.object({
    slugs: z.array(SlugAggregationShape),
})

const getPostBySlugInputShape = z.object({
    slug: z.string(),
})
const getPostBySlugOutputShape = z.object({
    post: PostShape,
    imageDetails: z.any(),
})

const getPostAggregationBySlugInputShape = z.object({
    slug: z.string(),
})
const getPostAggregationBySlugOutputShape = z.object({
    posts: z.array(PostAggregationShape),
})

const getPageBySlugInputShape = z.object({
    slug: z.string(),
})
const getPageBySlugOutputShape = z.object({
    page: PageShape,
    imageDetails: z.any(),
})

export const contentfulRouter = createTRPCRouter({
    getPosts: publicProcedure
        .input(getPostsInputShape)
        .output(getPostsOutputShape)
        .query(getPosts),
    getPostSlugs: publicProcedure
        .input(getPostSlugsInputShape)
        .output(getPostSlugsOutputShape)
        .query(getPostSlugs),
    getPostBySlug: publicProcedure
        .input(getPostBySlugInputShape)
        .output(getPostBySlugOutputShape)
        .query(getPostBySlug),
    getPostAggregationBySlug: publicProcedure
        .input(getPostAggregationBySlugInputShape)
        .output(getPostAggregationBySlugOutputShape)
        .query(getPostAggregationBySlug),
    getPageBySlug: publicProcedure
        .input(getPageBySlugInputShape)
        .output(getPageBySlugOutputShape)
        .query(getPageBySlug),
})
