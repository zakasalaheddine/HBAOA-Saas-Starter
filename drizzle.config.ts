import { defineConfig } from 'drizzle-kit'
import { env } from './src/utils/env'


export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
