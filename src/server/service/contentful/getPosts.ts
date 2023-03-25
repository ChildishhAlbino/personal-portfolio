import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { Post } from '@/types/post'

export async function getPosts({
  input: {},
}: inputWrapper<getPostsInput>): Promise<{
  posts: any[]
}> {
  const query = `query GetPosts($preview: Boolean){
    postCollection(preview: $preview) {
      items {
        title
        description
        publicationDate
        latestEdit
        thumbnail {
          url
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
    const posts = queryRes.postCollection.items
    return {
      posts,
    }
  } catch (e: any) {
    throw e
  }
}

interface getPostsInput {}

interface getPostsQueryVariables {}

type getPostsQueryResponse = {
  postCollection: {
    items: Array<Post>
  }
}
