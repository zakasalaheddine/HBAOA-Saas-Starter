import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'
import { db } from '@/db'
import * as schema from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        default: 'user'
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  plugins: [openAPI()]
})
