import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createTRPCContext } from '../../../server/api/trpc'
import { appRouter } from '../../../server/api/root'
import { env } from '@/env.mjs'

const cachedPaths = ['contentful.getPosts', 'contentful.getPostSlugs', 'contentful.getPostAggregationBySlug']

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    responseMeta({ ctx, paths, type, errors }) {
        // assuming you have all your public routes with the keyword `public` in them
        const pathIsCached =
            paths && paths.every((path) => cachedPaths.includes(path))
        // checking that no procedures errored
        const allOk = errors.length === 0
        // checking we're doing a query request
        const isQuery = type === 'query'
        const shouldCache = ctx && pathIsCached && allOk && isQuery
        console.log({ pathIsCached, shouldCache })
        if (shouldCache) {
            // cache request for 1 day + revalidate once every second
            const ONE_DAY_IN_SECONDS = 60 * 60 * 24
            console.log('Applying cache headers for path')
            return {
                headers: {
                    'cache-control': `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                },
            }
        }
        return {}
    },
    onError:
        env.NODE_ENV === 'development'
            ? ({ path, error }) => {
                console.error(
                    `❌ tRPC failed on ${path ?? '<no-path>'}: ${
                        error.message
                    }`,
                )
            }
            : undefined,
})
