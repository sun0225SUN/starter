import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/shared/auth/index.server'

export const { GET, POST, PATCH, PUT, DELETE } = toNextJsHandler(auth)
