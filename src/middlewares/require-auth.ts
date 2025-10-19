import type { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'

export const requireAuth = () => async (c: Context, next: Next) => {
  const user = c.get('user')
  if (!user) {
    throw new HTTPException(HTTP_STATUS_CODES.UNAUTHORIZED, {
      message: 'Unauthorized'
    })
  }
  await next()
}