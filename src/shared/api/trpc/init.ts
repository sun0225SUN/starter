import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

export interface TRPCContext {
  headers: Headers
}

export function createTRPCContext(headers = new Headers()): TRPCContext {
  return { headers }
}

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson })

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
