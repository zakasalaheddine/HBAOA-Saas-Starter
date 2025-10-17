import { pinoLogger } from 'hono-pino'
import { pino } from 'pino'

export const loggerMiddleware = () => {
  return pinoLogger({
    pino: pino({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      } : undefined,
    }),
  })
}
