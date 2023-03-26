import { contentQuery } from './contentQuery'
import { serialize } from 'next-mdx-remote/serialize'
// @ts-ignore
import rehypeExternalImageSize from 'rehype-external-img-size'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Pluggable } from 'unified'
import { inputWrapper } from '../../api/inputWrapper'
import { getPlaiceholder } from 'plaiceholder'

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

    const remarkPlugins = [remarkUnwrapImages]

    console.time(`Serializing "${slug}" took`)

    const promises = [
      findEmbeddedImages(post.body),
      await serialize(post.body, {
        mdxOptions: {
          remarkPlugins,
          format: 'mdx',
        },
      }),
    ]

    const [imageDetails, serializedMdx] = await Promise.all(promises)

    post.serializedMdx = serializedMdx
    console.timeEnd(`Serializing "${slug}" took`)

    return {
      post,
      imageDetails,
    }
  } catch (e: any) {
    console.error(e)
    return {
      error: e.message,
    }
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
      const normalized = url.includes('https:') ? url : `https:${url}`

      return [url, await getPlaiceholder(normalized)]
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
