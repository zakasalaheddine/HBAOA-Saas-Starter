import type { Context, Next } from 'hono'
import { auth } from '@/lib/auth'

export const authMiddleware = () => async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.header() })
  if (!session) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }
  c.set('user', session.user)
  c.set('session', session.session)
  return next()
}
