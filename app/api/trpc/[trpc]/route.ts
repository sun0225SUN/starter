import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/_app/trpc/router'
import { createTRPCContext } from '@/shared/api/trpc'

function handler(request: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => createTRPCContext(request.headers),
  })
}

export { handler as GET, handler as POST }
