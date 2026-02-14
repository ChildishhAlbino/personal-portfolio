import { PostAggregation } from '@/types/post'
import { getImageDetails } from './plaiceholder'

export async function getPostWithThumbnailDetails(
    post: PostAggregation
): Promise<PostAggregation> {
    if (!post.thumbnail) {
        return post
    }
    const thumbnailWithDetails = {
        ...post.thumbnail,
        details: await getImageDetails(post.thumbnail.url),
    }
    return {
        ...post,
        thumbnail: thumbnailWithDetails,
    }
}
