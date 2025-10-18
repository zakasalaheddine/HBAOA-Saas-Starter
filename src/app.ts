import { configureOpenAPI } from '@/lib/configure-openapi'
import { createApp } from '@/lib/create-app'
import indexRoute from '@/routes/index.route'
import { authRouter } from './routes/auth.route'

const app = createApp()

const routes = [indexRoute, authRouter]

configureOpenAPI(app)

routes.forEach((route) => {
  app.route('/', route)
})

export default app
