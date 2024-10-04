import { Hono } from 'hono'
import { tursoMiddleware } from './middlewares/turso'
import { cors } from 'hono/cors'
import user from './routes/users'
import posts from './routes/posts'

const app = new Hono()
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)
app.use('*', tursoMiddleware)
app.route('/', user)
app.route('/', posts)

export default app
