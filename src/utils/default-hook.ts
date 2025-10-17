/** biome-ignore-all lint/suspicious/noExplicitAny: Will be used for any type */
import type { Hook } from '@hono/zod-openapi'
import type { AppVariables } from '@/types/app'
import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'

export const defaultHook: Hook<{ Variables: AppVariables }, any, any, any> = (
  results,
  c
) => {
  if (!results.success) {
    return c.json(
      {
        success: results.success,
        errors: results.error.flatten().fieldErrors
      },
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    )
  }
}
