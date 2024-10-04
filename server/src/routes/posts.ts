import { Hono } from 'hono'
import { Bindings, Post } from '../types/types'

const app = new Hono<{ Bindings: Bindings }>().basePath('/posts')

/* User's posts */
app.get('/', async (c) => {
  const database = c.get('turso')
  /* User id */
  const id = Number(c.req.query('user_id') as string)
  const { rows } = await database.execute({
    sql: `SELECT id,title FROM Posts WHERE user_id = ?`,
    args: [id],
  })
  const posts = rows as unknown as Post[]
  if (posts.length === 0) return c.json({ message: 'Posts not found' }, 404)
  return c.json(posts, 200)
})

app.post('/', async (c) => {
  const database = c.get('turso')
  const { title, user_id } = await c.req.json()
  const { lastInsertRowid } = await database.execute({
    sql: `INSERT INTO Posts (title, user_id) VALUES (?,?)`,
    args: [title, user_id],
  })
  return c.json({ id: Number(lastInsertRowid?.toString()), title }, 201)
})

app.delete('/:id', async (c) => {
  const database = c.get('turso')
  const id = Number(c.req.param('id'))
  const { rowsAffected } = await database.execute({
    sql: `DELETE FROM Posts WHERE id = ?`,
    args: [id],
  })
  if (!rowsAffected) return c.json({ message: 'Post not found' }, 404)
  return c.json({ message: `Post ${id} successfully deleted` }, 200)
})

app.put('/:id', async (c) => {
  const database = c.get('turso')
  const { title } = await c.req.json()
  const id = Number(c.req.param('id'))
  const { rowsAffected } = await database.execute({
    sql: `UPDATE Posts SET title = ? WHERE id = ?`,
    args: [title, id],
  })
  if (!rowsAffected) return c.json({ message: 'Post not found' }, 404)
  return c.json({ message: `Post ${id} successfully updated` }, 200)
})

export default app
