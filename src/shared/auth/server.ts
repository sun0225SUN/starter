import 'server-only'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { headers } from 'next/headers'
import { env } from '@/env'
import { db } from '@/shared/db'
import { authSchema } from '@/shared/db/auth-schema'
import { buildSocialAuth } from './providers'

const socialAuth = buildSocialAuth({
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  githubClientId: env.GITHUB_CLIENT_ID,
  githubClientSecret: env.GITHUB_CLIENT_SECRET,
})

export const enabledSocialProviders = socialAuth.providers

export const auth = betterAuth({
  appName: 'Starter',
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.BETTER_AUTH_URL],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  user: {
    changeEmail: {
      enabled: false,
    },
  },
  socialProviders: socialAuth.socialProviders,
  account: {
    accountLinking: {
      trustedProviders: socialAuth.providers,
    },
  },
  plugins: [nextCookies()],
})

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export type Session = typeof auth.$Infer.Session
