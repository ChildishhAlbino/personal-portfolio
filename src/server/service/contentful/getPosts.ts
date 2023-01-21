import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'

export async function getPosts({ input: {} }: inputWrapper<getPostsInput>) {
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
    console.log({ queryRes })
    const posts = queryRes.postCollection.items
    return {
      posts,
    }
  } catch (e: any) {
    console.error(e)
    return {
      error: e.message,
    }
  }
}

interface getPostsInput {}

interface getPostsQueryVariables {}

type getPostsQueryResponse = {
  postCollection: {
    items: Array<any>
  }
}
