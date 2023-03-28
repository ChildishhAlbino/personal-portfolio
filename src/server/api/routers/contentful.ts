import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { getPostBySlug, getPosts } from '../../service/contentful'
import { PostAggregationShape, PostShape } from '@/types/post'

const getPostsInputShape = z.object({})
const getPostsOutputShape = z.object({
  posts: z.array(PostAggregationShape)
})

const getPostBySlugInputShape = z.object({
  slug: z.string(),
})
const getPostBySlugOutputShape = z.object({
  post: PostShape,
  imageDetails: z.any()
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
})
