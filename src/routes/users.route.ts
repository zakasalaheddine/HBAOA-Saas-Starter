import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '@/lib/create-app'
import { requireAuth } from '@/middlewares/require-auth'
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'
import { jsonContent } from '@/utils/json-content'

export const usersRouter = createRouter()

usersRouter.use('/users/*', requireAuth()) // require auth for all /users routes

usersRouter.openapi(
  createRoute({
    path: '/users',
    method: 'get',
    tags: ['users'],
    description: 'Get all users',
    responses: {
      [HTTP_STATUS_CODES.OK]: jsonContent(
        z.array(z.object({ id: z.string(), name: z.string() })),
        'Users response'
      ),
      [HTTP_STATUS_CODES.UNAUTHORIZED]: jsonContent(
        z.object({ message: z.string() }),
        'Unauthorized'
      )
    }
  }),
  (c) => {
    return c.json([{ id: '1', name: 'John Doe' }], HTTP_STATUS_CODES.OK)
  }
)

usersRouter.openapi(
  createRoute({
    path: '/users/:id',
    method: 'get',
    tags: ['users'],
    description: 'Get a single user',
    responses: {
      [HTTP_STATUS_CODES.OK]: jsonContent(
        z.object({ id: z.string(), name: z.string() }),
        'User response'
      ),
      [HTTP_STATUS_CODES.UNAUTHORIZED]: jsonContent(
        z.object({ message: z.string() }),
        'Unauthorized'
      )
    }
  }),
  (c) => {
    const { id } = c.req.param()
    return c.json({ id, name: 'John Doe' }, HTTP_STATUS_CODES.OK)
  }
)
