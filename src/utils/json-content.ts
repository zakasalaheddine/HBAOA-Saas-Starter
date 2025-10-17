import type { ZodSchema } from '@/types/zod'

export const jsonContent = <T extends ZodSchema>(
  schema: T,
  description: string
) => {
  return {
    content: {
      'application/json': {
        schema
      }
    },
    description
  }
}
