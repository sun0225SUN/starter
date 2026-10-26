import { homeRouter } from '@/_pages/home/api/router'
import { createTRPCRouter } from '@/shared/api/trpc'

export const appRouter = createTRPCRouter({
  home: homeRouter,
})

export type AppRouter = typeof appRouter
