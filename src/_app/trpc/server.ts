import 'server-only'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { headers } from 'next/headers'
import { cache } from 'react'
import { createTRPCContext } from '@/shared/api/trpc'
import { makeQueryClient } from './query-client'
import { appRouter } from './router'

export const getQueryClient = cache(makeQueryClient)

const getTRPCContext = cache(async () => createTRPCContext(await headers()))

export const trpc = createTRPCOptionsProxy({
  ctx: getTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})
