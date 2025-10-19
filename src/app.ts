import { configureOpenAPI } from '@/lib/configure-openapi'
import { createApp } from '@/lib/create-app'
import { authRouter } from './routes/auth.route'
import { usersRouter } from './routes/users.route'

const app = createApp()

const routes = [usersRouter, authRouter]

configureOpenAPI(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app
