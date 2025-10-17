import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '@/lib/create-app'
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'
import { jsonContent } from '@/utils/json-content'

const router = createRouter().openapi(
  createRoute({
    path: '/',
    method: 'get',
    tags: ['index'],
    description: 'Get the index route',
    responses: {
      [HTTP_STATUS_CODES.OK]: jsonContent(
        z.object({ message: z.string() }),
        'Okay response'
      )
    }
  }),
  (c) => {
    return c.json({ message: 'Hello Hono!' }, HTTP_STATUS_CODES.OK)
  }
)

export default router
