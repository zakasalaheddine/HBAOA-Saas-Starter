import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import * as z from 'zod'

expand(config())

const envSchema = z.object({
  PORT: z.coerce.number().default(9000),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.url()
})

export type Env = z.infer<typeof envSchema>

let env: Env
try {
  env = envSchema.parse(process.env)
} catch (e) {
  const error = e as z.ZodError
  console.error(
    'Invalid environment variables:',
    error.flatten().fieldErrors
  )
  process.exit(1)
}

export { env }
