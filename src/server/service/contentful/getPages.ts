import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { Page, PageAggregation } from '@/types/page'

export async function getPages({
    input: {},
}: inputWrapper<getPagesInput>): Promise<{
    pages: PageAggregation[]
}> {
    const query = `query GetPages($preview: Boolean) {
      pageCollection(preview: $preview) {
        total
        items {
          title
          mdx
          slug
        }
      }
    }`

    try {
        const queryRes = await contentQuery<
            getPageQueryResponse,
            getPageQueryResponse
        >({
            query,
        })
        const pages = queryRes.pageCollection.items
        return {
            pages,
        }
    } catch (e: any) {
        throw e
    }
}

interface getPagesInput {}

interface getPostsQueryVariables {}

type getPageQueryResponse = {
    pageCollection: {
        items: Array<PageAggregation>
    }
}
