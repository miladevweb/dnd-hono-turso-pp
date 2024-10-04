import { MiddlewareHandler } from 'hono'
import { createClient } from '@libsql/client'

export const tursoMiddleware: MiddlewareHandler = async (c, next) => {
  if (c.get('turso')) await next()
  else {
    const turso = createClient({
      url: c.env.DATABASE_URL,
      authToken: c.env.DATABASE_TOKEN,
    })

    c.set('turso', turso)
    await next()
  }
}
