import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'
import type { PinoLogger } from 'hono-pino'
import notFound from '@/middlewares/not-found'
import onError from '@/middlewares/on-error'
import { loggerMiddleware } from '@/middlewares/pino-logger'

export const createApp = () => {
  const app = new OpenAPIHono<{
    Variables: {
      logger: PinoLogger
    }
  }>({ strict: false })

  app.use(requestId()).use(loggerMiddleware())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
