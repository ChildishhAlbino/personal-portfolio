import { contentQuery } from './contentQuery'
import { serialize } from 'next-mdx-remote/serialize'
// @ts-ignore
import rehypeExternalImageSize from 'rehype-external-img-size'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Pluggable } from 'unified'
import { inputWrapper } from '../../api/inputWrapper'

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
    console.log({ queryRes })

    const [post] = queryRes.postCollection.items

    const remarkPlugins = [remarkUnwrapImages]

    console.time(`Serializing ${slug} took`)

    post.serializedMdx = await serialize(post.body, {
      mdxOptions: {
        remarkPlugins,
        format: 'mdx',
      },
    })

    console.timeEnd(`Serializing ${slug} took`)

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
