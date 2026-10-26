import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { io } from 'next/cache'
import { getQueryClient, trpc } from '@/_app/trpc/server'
import { DatabaseDemoClient } from './database-demo-client'

export async function DatabaseDemo() {
  await io()

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.home.listNotes.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DatabaseDemoClient />
    </HydrationBoundary>
  )
}
