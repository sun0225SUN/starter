import 'server-only'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import * as schema from './schema'

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>
}

const client = globalForDb.postgresClient ?? postgres(env.DATABASE_URL)

if (env.NODE_ENV !== 'production') {
  globalForDb.postgresClient = client
}

export const db = drizzle(client, { schema })
