import { createTRPCRouter, publicProcedure } from '../trpc'
import { z } from 'zod'
import { getPostBySlug, getPosts } from '../../service/contentful'

//region Custom Input Shapes
const getPostsInputShape = z.object({})
const getPostBySlugInputShape = z.object({
  slug: z.string(),
})
//endregion

export const contentfulRouter = createTRPCRouter({
  getPosts: publicProcedure.input(getPostsInputShape).query(getPosts),
  getPostBySlug: publicProcedure
    .input(getPostBySlugInputShape)
    .query(getPostBySlug),
})
