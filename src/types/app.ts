import type { OpenAPIHono } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'
import type { auth } from '@/lib/auth'

export type AppVariables = {
  logger: PinoLogger
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

export type App = OpenAPIHono<{
  Variables: AppVariables
}>
