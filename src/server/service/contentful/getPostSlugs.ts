import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { SlugAggregation } from '@/types/post'


export async function getPostSlugs({
    input: {},
}: inputWrapper<getPostSlugInput>): Promise<{
    slugs: SlugAggregation[]
}> {
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
        const rawPosts = queryRes.postCollection.items
        console.log({rawPosts})
        return {
            slugs: rawPosts,
        }
    } catch (e: any) {
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
