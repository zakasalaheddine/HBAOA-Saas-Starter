import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import * as HTTP_STATUS_CODES from '@/utils/http-status-codes'

const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status
  const statusCode =
    currentStatus !== HTTP_STATUS_CODES.OK
      ? (currentStatus as ContentfulStatusCode)
      : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR

  const env = c.env?.NODE_ENV || process.env?.NODE_ENV
  return c.json(
    {
      message: err.message,

      stack: env === 'production' ? undefined : err.stack
    },
    statusCode
  )
}

export default onError
