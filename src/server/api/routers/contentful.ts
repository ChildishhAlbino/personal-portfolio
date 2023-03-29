import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { getPostBySlug, getPosts } from '../../service/contentful'
import { PostAggregationShape, PostShape } from '@/types/post'
import { PageShape } from '@/types/page'
import { getPageBySlug } from '@/server/service/contentful/getPageBySlug'

const getPostsInputShape = z.object({})
const getPostsOutputShape = z.object({
    posts: z.array(PostAggregationShape),
})

const getPostBySlugInputShape = z.object({
    slug: z.string(),
})
const getPostBySlugOutputShape = z.object({
    post: PostShape,
    imageDetails: z.any(),
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
    getPostBySlug: publicProcedure
        .input(getPostBySlugInputShape)
        .output(getPostBySlugOutputShape)
        .query(getPostBySlug),
    getPageBySlug: publicProcedure
        .input(getPageBySlugInputShape)
        .output(getPageBySlugOutputShape)
        .query(getPageBySlug),
})
