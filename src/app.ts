import { createApp } from '@/lib/create-app'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', () => {
  throw new Error('Test error')
})
export default app
