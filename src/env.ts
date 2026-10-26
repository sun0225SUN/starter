import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const postgresUrl = z.url().refine(
  (value) => {
    const protocol = new URL(value).protocol
    return protocol === 'postgres:' || protocol === 'postgresql:'
  },
  { message: 'DATABASE_URL must use the postgres or postgresql protocol' },
)

export const env = createEnv({
  server: {
    DATABASE_URL: postgresUrl,
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },
  client: {
    NEXT_PUBLIC_UMAMI_HOST: z.string().trim().min(1).optional(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().trim().min(1).optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_UMAMI_HOST: process.env.NEXT_PUBLIC_UMAMI_HOST,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
  emptyStringAsUndefined: true,
})
