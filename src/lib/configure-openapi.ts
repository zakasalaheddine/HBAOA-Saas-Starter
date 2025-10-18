import { Scalar } from '@scalar/hono-api-reference'
import { auth } from '@/lib/auth'
import type { App } from '@/types/app'
import packageJSON from '../../package.json'

export const configureOpenAPI = (app: App) => {
  app.get('/docs', async (c) => {
    try {
      const mainSchema = app.getOpenAPIDocument({
        openapi: '3.0.0',
        info: {
          title: 'API',
          version: packageJSON.version,
          description:
            'Combined API documentation including authentication endpoints'
        }
      })

      const authSchema = await auth.api.generateOpenAPISchema()

      // Process auth paths to add tags
      const processedAuthPaths = Object.keys(authSchema.paths || {}).reduce(
        (acc, path) => {
          const pathData = authSchema.paths?.[path]
          if (pathData) {
            // Add tags to all methods in the path
            const processedPath = Object.keys(pathData).reduce(
              (methodAcc, method) => {
                const methodData = (pathData as Record<string, unknown>)[method]
                if (methodData && typeof methodData === 'object') {
                  methodAcc[method] = {
                    ...methodData,
                    tags: ['Auth']
                  }
                }
                return methodAcc
              },
              {} as Record<string, unknown>
            )

            acc[`/api/auth${path}`] = processedPath
          }
          return acc
        },
        {} as Record<string, unknown>
      )

      const combinedSchema = {
        ...mainSchema,
        tags: [
          ...(mainSchema.tags || []),
          {
            name: 'Auth',
            description: 'Authentication and authorization endpoints'
          },
          {
            name: 'API',
            description: 'Main API endpoints'
          }
        ],
        paths: {
          ...mainSchema.paths,
          ...processedAuthPaths
        },
        components: {
          ...mainSchema.components,
          schemas: {
            ...mainSchema.components?.schemas,
            ...authSchema.components?.schemas
          }
        }
      }

      return c.json(combinedSchema)
    } catch (error) {
      console.error('Error generating combined schema:', error)
      return c.json({ error: 'Failed to generate combined schema' }, 500)
    }
  })

  app.get(
    '/scalar',
    Scalar({
      pageTitle: 'Skule App API Documentation',
      theme: 'kepler',
      url: '/docs',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'axios'
      },
      hideDownloadButton: false
    })
  )
}
