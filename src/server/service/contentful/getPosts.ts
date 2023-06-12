import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { PostAggregation } from '@/types/post'
import { getImageDetails } from '@/server/utils/plaiceholder'
import { DateTime } from 'luxon'

export async function getPosts({
    input: {},
}: inputWrapper<getPostsInput>): Promise<{
    posts: PostAggregation[]
}> {
    console.time("getPosts took:")
    const query = `query GetPosts($preview: Boolean){
    postCollection(preview: $preview, order:latestEdit_DESC) {
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

    try {
        const queryRes = await contentQuery<
            getPostsQueryResponse,
            getPostsQueryVariables
        >({
            query,
        })
        const rawPosts = queryRes.postCollection.items.map(post => {
            return {
                ...post,
                publicationDate: DateTime.fromISO(post.publicationDate)
                    .setLocale('en-AU')
                    .toLocaleString(DateTime.DATETIME_FULL, { locale: "en-AU" })
            }
        })

        const posts = await Promise.all(
            rawPosts.map(getPostWithThumbnailDetails)
        )

        console.timeEnd("getPosts took:")
        return {
            posts,
        }
    } catch (e: any) {
        console.timeEnd("getPosts took:")
        throw e
    }
}

interface getPostsInput {}

interface getPostsQueryVariables {}

type getPostsQueryResponse = {
    postCollection: {
        items: Array<PostAggregation>
    }
}

async function getPostWithThumbnailDetails(
    post: PostAggregation
): Promise<PostAggregation> {
    const thumbnailWithDetails = {
        ...post.thumbnail,
        details: await getImageDetails(post.thumbnail.url),
    }
    return {
        ...post,
        thumbnail: thumbnailWithDetails,
    }
}
