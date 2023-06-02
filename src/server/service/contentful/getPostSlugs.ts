import { contentQuery } from './contentQuery'
import { inputWrapper } from '../../api/inputWrapper'
import { SlugAggregation } from '@/types/post'


export async function getPostSlugs({
    input: {},
}: inputWrapper<getPostSlugInput>): Promise<{
    slugs: SlugAggregation[]
}> {
    const timestamp = new Date().getTime()
    console.time(`${timestamp}:: getPostsSlugs took:`)
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
        console.timeEnd(`${timestamp}:: getPostsSlugs took:`)
        return {
            slugs: slugs,
        }
    } catch (e: any) {
        console.timeEnd(`${timestamp}:: getPostsSlugs took:`)
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
