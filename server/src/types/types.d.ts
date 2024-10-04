import { Client } from '@libsql/client'

export type Bindings = {
  CLIENT_URL: string
  DATABASE_URL: string
  DATABASE_TOKEN: string
}

export type User = {
  id: number
  username: string
  created_at: Date
  posts: Post[]
}
export type Post = {
  id: number
  title: string
  user_id: number
  created_at: Date
}

declare module 'hono' {
  interface ContextVariableMap {
    turso: Client
  }
}
