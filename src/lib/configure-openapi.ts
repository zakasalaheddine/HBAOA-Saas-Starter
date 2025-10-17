import { Scalar } from '@scalar/hono-api-reference'
import type { App } from '@/types/app'
import packageJSON from '../../package.json'

export const configureOpenAPI = (app: App) => {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: packageJSON.version
    }
  })

  app.get(
    '/scalar',
    Scalar({
      pageTitle: 'SAAS STARTER HONO API',
      theme: 'kepler',
      url: '/docs',
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'axios'
      }
    })
  )
}
