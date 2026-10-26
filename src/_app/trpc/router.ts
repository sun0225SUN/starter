import { createTRPCRouter } from '@/shared/api/trpc'

export const appRouter = createTRPCRouter({})

export type AppRouter = typeof appRouter
