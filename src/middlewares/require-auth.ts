import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'

export const requireAuth = (requiredRole: 'admin' | 'user' = 'user') => async (c: Context, next: Next) => {
  const user = c.get('user')
  if (!user || user.role !== requiredRole) {
    throw new HTTPException(HTTP_STATUS_CODES.UNAUTHORIZED, {
      message: 'Unauthorized'
    })
  }
  await next()
}