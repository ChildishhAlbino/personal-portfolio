import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { getPostBySlug, getPosts } from '../../service/contentful'
import { PostShape } from '@/types/post'

const getPostsInputShape = z.object({})
const getPostsOutputShape = z.object({
  posts: z.array(PostShape),
})

const getPostBySlugInputShape = z.object({
  slug: z.string(),
})

export const contentfulRouter = createTRPCRouter({
  getPosts: publicProcedure
    .input(getPostsInputShape)
    .output(getPostsOutputShape)
    .query(getPosts),
  getPostBySlug: publicProcedure
    .input(getPostBySlugInputShape)
    .query(getPostBySlug),
})
