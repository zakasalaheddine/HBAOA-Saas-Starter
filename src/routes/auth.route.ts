import { auth } from '@/lib/auth'
import { createRouter } from '@/lib/create-app'

export const authRouter = createRouter().on(
  ['POST', 'GET', 'OPTIONS'],
  '/api/auth/*',
  (c) => {
    return auth.handler(c.req.raw)
  }
)
