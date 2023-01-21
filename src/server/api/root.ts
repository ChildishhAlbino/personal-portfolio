import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/example'
import { contentfulRouter } from './routers/contentful'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  wonder: exampleRouter,
  contentful: contentfulRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
