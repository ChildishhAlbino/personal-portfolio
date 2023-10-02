import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { TRPCError } from '@trpc/server'
import { getImageDetails } from '@/server/utils/plaiceholder'

import { serializeMdx } from '@/server/utils/mdx'
import { getPostWithThumbnailDetails } from '@/server/utils/thumbnailUtils'

export async function getPostBySlug({
    input: { slug },
}: inputWrapper<getPostBySlugInput>) {
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
        body
        keywords
        slug
      }
    }
  }`

    const variables: getPostBySlugInput = { slug }

    try {
        const queryRes = await contentQuery<
            getPostBySlugQueryResponse,
            getPostBySlugInput
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

        const promises = [
            findEmbeddedImages(post.body),
            serializeMdx(post.body),
        ]

        const [imageDetails, serializedMdx] = await Promise.all(promises)
        console.timeEnd(timeKey)
        const postWithThumbnailDetails = await getPostWithThumbnailDetails(post)
        return {
            post: {
                ...postWithThumbnailDetails,
                serializedMdx,
            },
            imageDetails,
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

async function findEmbeddedImages(rawMdx: string) {
    const regex = /!\[.*\]\((.*?)\)/g
    const urls: string[] = []
    let match

    while ((match = regex.exec(rawMdx)) !== null) {
        urls.push(match[1] as string)
    }

    const imageDetails = await Promise.all(
        urls.map(async (url) => {
            const details = await getImageDetails(url)
            return [url, details]
        })
    )
    return Object.fromEntries(imageDetails)
}

interface getPostBySlugInput {
    slug: String
}

type getPostBySlugQueryResponse = {
    postCollection: {
        items: Array<any>
    }
}
