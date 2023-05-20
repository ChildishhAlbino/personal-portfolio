import { contentQuery } from './contentQuery'
import { serialize } from 'next-mdx-remote/serialize'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkPrism from 'remark-prism'
import { inputWrapper } from '../../api/inputWrapper'
import { TRPCError } from '@trpc/server'
import { PageAggregation } from '@/types/page'
import { getImageDetails } from '@/server/utils/plaiceholder'
import {
    remarkDefinitionList,
    defListHastHandlers,
} from 'remark-definition-list'

export async function getPageBySlug({
    input: { slug },
}: inputWrapper<getPageBySlugInput>) {
    const query = `query GetPageBySlug($preview: Boolean, $slug: String!) {
        pageCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
        total
        items {
          title
          mdx
          slug
          css
        }
      }
    }`

    const variables: getPageBySlugInput = { slug }

    try {
        const queryRes = await contentQuery<
            getPageBySlugQueryResponse,
            getPageBySlugInput
        >({
            query,
            variables,
        })
        const [page] = queryRes.pageCollection.items
        if (!page) {
            throw Error(`No page for slug '${slug} was found...`)
        }
        const remarkPlugins = [
            remarkUnwrapImages,
            remarkDefinitionList,
            [
                remarkPrism,
                {
                    classPrefix: 'language-',
                },
            ],
        ] as any

        const timeKey = `${new Date().getTime()}: Serializing "${slug}" took`
        console.time(timeKey)

        const promises = [
            findEmbeddedImages(page.mdx),
            await serialize(page.mdx, {
                mdxOptions: {
                    remarkPlugins,
                    format: 'mdx',
                    remarkRehypeOptions: {
                        handlers: {
                            ...defListHastHandlers,
                        },
                    },
                },
            }),
        ]

        const [imageDetails, serializedMdx] = await Promise.all(promises)

        console.timeEnd(timeKey)
        return {
            page: {
                ...page,
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

interface getPageBySlugInput {
    slug: String
}

type getPageBySlugQueryResponse = {
    pageCollection: {
        items: Array<PageAggregation>
    }
}
