import { t } from '../utils'
import { z } from 'zod'
import { getPostBySlug, getPosts } from '../../service/contentful' //region Custom Input Shapes

//region Custom Input Shapes
const getPostsInputShape = z.object({})
const getPostBySlugInputShape = z.object({
  slug: z.string(),
})
//endregion

export const contentfulRouter = t.router({
  getPosts: t.procedure.input(getPostsInputShape).query(getPosts),
  getPostBySlug: t.procedure
    .input(getPostBySlugInputShape)
    .query(getPostBySlug),
})
