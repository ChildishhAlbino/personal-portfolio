import { contentQuery } from './contentQuery'
import { serialize } from 'next-mdx-remote/serialize'
// @ts-ignore
import rehypeExternalImageSize from 'rehype-external-img-size'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Pluggable } from 'unified'
import { inputWrapper } from '../../trpc/inputWrapper'

export async function getPostBySlug({
  input: { slug },
}: inputWrapper<getPostBySlugInput>) {
  const query = `query GetPosts($preview: Boolean, $slug: String!) {
    postMdxCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
      items {
        title
        description
        publicationDate
        latestEdit
        thumbnail {
          url
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

    const [post] = queryRes.postMdxCollection.items

    const rehypePlugins = [
      [rehypeExternalImageSize, { baseUrl: 'https:' }],
    ] as Pluggable[]

    const remarkPlugins = [remarkUnwrapImages]

    post.serializedMdx = await serialize(post.body, {
      mdxOptions: {
        rehypePlugins,
        remarkPlugins,
        format: 'mdx',
      },
    })

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
  postMdxCollection: {
    items: Array<any>
  }
}
