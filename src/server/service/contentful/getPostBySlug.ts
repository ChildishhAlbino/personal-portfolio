import { contentQuery } from './contentQuery'

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
        }
        body {
          json
          links {
            assets {
              block {
                url
                width
                size
                height
                sys {
                  id
                }
              }
            }
          }
        }
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
    console.log({ queryRes })
    const [post] = queryRes.postCollection.items
    return {
      ...post,
    }
  } catch (e: any) {
    console.error(e)
    return {
      error: e.message,
    }
  }
}

interface getPostBySlugInput {
  slug: String
}

type getPostBySlugQueryResponse = {
  postCollection: {
    items: Array<any>
  }
}
