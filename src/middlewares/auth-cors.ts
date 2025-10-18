import { cors } from 'hono/cors'
import { env } from '@/utils/env'

export const authCors = () => {
  return cors({
    origin: env.BETTER_AUTH_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
  })
}
