import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'
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

  app.use(requestId()).use(loggerMiddleware())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
