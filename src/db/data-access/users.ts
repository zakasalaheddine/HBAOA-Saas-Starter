import { eq } from 'drizzle-orm'
import { db } from '..'
import { user } from '../schema'

const list = async () => {
  return await db.select().from(user)
}

const getById = async (id: string) => {
  return await db
    .select()
    .from(user)
    .where(eq(user.id, id))
    .limit(1)
    .then((result) => result[0] ?? null)
}

export const users = {
  list,
  getById
}