import { contentQuery } from './contentQuery'
import { serialize } from 'next-mdx-remote/serialize'
import remarkUnwrapImages from 'remark-unwrap-images'
import { inputWrapper } from '../../api/inputWrapper'
import { getPlaiceholder } from 'plaiceholder'
import { TRPCError } from '@trpc/server'
import { getImageDetails } from '@/server/utils/plaiceholder'
import AllComponents from '@/components'
import { PostAggregation } from '@/types/post'

export async function getPostAggregationBySlug({
                                                   input: { slug },
                                               }: inputWrapper<getPostAggregationBySlugInput>) {
    const query = `query GetPosts($preview: Boolean, $slug: String!) {
    postCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
      items {
        title
        description
        publicationDate
        latestEdit
        thumbnail {
          url
          width
          height
        }
        keywords
        slug
      }
    }
  }`

    const variables: getPostAggregationBySlugInput = { slug }

    try {
        const queryRes = await contentQuery<
            getPostAggregationBySlugQueryResponse,
            getPostAggregationBySlugInput
        >({
            query,
            variables,
        })
        const [post] = queryRes.postCollection.items

        if (!post) {
            throw Error(`No post for slug '${slug} was found...`)
        }

        const timeKey = `${new Date().getTime()}: Serializing "${slug}" took`
        console.time(timeKey)

        console.timeEnd(timeKey)
        const thumbnailWithDetails = {
            ...post.thumbnail,
            details: await getImageDetails(post.thumbnail.url),
        }
        return {
            posts: [{
                ...post,
                thumbnail: thumbnailWithDetails,
            }],
        }
    } catch (e: any) {
        console.error(e)
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred, please try again later.',
            // optional: pass the original error to retain stack trace
            cause: e,
        })
    }
}

interface getPostAggregationBySlugInput {
    slug: String
}

type getPostAggregationBySlugQueryResponse = {
    postCollection: {
        items: Array<any>
    }
}
