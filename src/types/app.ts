import type { OpenAPIHono } from "@hono/zod-openapi"
import type { PinoLogger } from "hono-pino"

export type AppVariables = {
  logger: PinoLogger
}

export type App = OpenAPIHono<{
  Variables: AppVariables
}>