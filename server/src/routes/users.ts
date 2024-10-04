import { Hono } from 'hono'
import { Bindings, Post, User } from '../types/types'

const app = new Hono<{ Bindings: Bindings }>().basePath('/users')

/* We get the user with their posts */
app.get('/:username', async (c) => {
  const database = c.get('turso')
  const username = c.req.param('username')
  const { rows } = await database.execute({
    sql: `SELECT username, id FROM Users WHERE username = ? `,
    args: [username],
  })
  if (rows.length === 0) return c.json([], 404)
  const users = rows as unknown as User[]
  const { rows: posts } = await database.execute({
    sql: `SELECT title,id FROM Posts WHERE user_id = ?`,
    args: [users[0].id],
  })
  users[0].posts = posts as unknown as Post[]
  return c.json(users, 200)
})

app.post('/', async (c) => {
  const database = c.get('turso')
  const { username } = await c.req.json()
  const { lastInsertRowid } = await database.execute({
    sql: `INSERT INTO Users (username) VALUES (?)`,
    args: [username],
  })

  return c.json({ id: Number(lastInsertRowid?.toString()), username }, 201)
})

/* Search for a user by filter */
app.get('/', async (c) => {
  const database = c.get('turso')
  const username = c.req.query('search') as string
  const { rows } = await database.execute({
    sql: `SELECT username,id FROM Users WHERE username LIKE ? AND LENGTH(?) >= 3`,
    args: [`%${username}%`, username],
  })
  const users = rows as unknown as User[]

  if (users.length === 0) return c.json([], 404)
  else {
    const userData = users.map(async (user) => {
      const { rows: posts } = await database.execute({
        sql: `SELECT title,id FROM Posts WHERE user_id = ?`,
        args: [user.id],
      })
      user.posts = posts as unknown as Post[]
      return user
    })
    const data = await Promise.all(userData)
    return c.json(data, 200)
  }
})

export default app
