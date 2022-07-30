// src/server/router/index.ts
import { t } from '../utils'

import { contentfulRouter } from './contentful'

export const appRouter = t.router({
  contentful: contentfulRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
