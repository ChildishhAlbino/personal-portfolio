import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { SlugAggregation } from '@/types/post'


export async function getPostSlugs({
    input: {},
}: inputWrapper<getPostSlugInput>): Promise<{
    slugs: SlugAggregation[]
}> {
    console.time("getPostsSlugs took:")
    const query = `query GetPosts($preview: Boolean){
    postCollection(preview: $preview, order:latestEdit_DESC) {
      items {
        slug
      }
    }
  }`

    try {
        const queryRes = await contentQuery<
            getPostSlugQueryResponse,
            getPostSlugsQueryVariables
        >({
            query,
        })
        const slugs = queryRes.postCollection.items
        console.timeEnd("getPostsSlugs took:")
        return {
            slugs: slugs,
        }
    } catch (e: any) {
        console.timeEnd("getPostsSlugs took:")
        throw e
    }
}

interface getPostSlugInput {}

interface getPostSlugsQueryVariables {}

type getPostSlugQueryResponse = {
    postCollection: {
        items: Array<SlugAggregation>
    }
}
