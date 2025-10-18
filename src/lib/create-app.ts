import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'
import { authMiddleware } from '@/middlewares/auth'
import { authCors } from '@/middlewares/auth-cors'
import notFound from '@/middlewares/not-found'
import onError from '@/middlewares/on-error'
import { loggerMiddleware } from '@/middlewares/pino-logger'
import type { AppVariables } from '@/types/app'
import { defaultHook } from '@/utils/default-hook'

export const createRouter = () => {
  return new OpenAPIHono<{ Variables: AppVariables }>({
    strict: false,
    defaultHook
  })
}

export const createApp = () => {
  const app = createRouter()

  app.use(requestId())
  app.use(loggerMiddleware())
  app.use(authCors())
  app.use(authMiddleware())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
