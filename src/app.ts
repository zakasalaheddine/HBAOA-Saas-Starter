import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'
import type { PinoLogger } from 'hono-pino'
import notFound from '@/middlewares/not-found'
import onError from '@/middlewares/on-error'
import { loggerMiddleware } from '@/middlewares/pino-logger'


const app = new OpenAPIHono<{
  Variables: {
    logger: PinoLogger
  }
}>()

app.use(requestId()).use(loggerMiddleware())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', () => {
  throw new Error('Test error')
})

app.notFound(notFound)
app.onError(onError)

export default app
