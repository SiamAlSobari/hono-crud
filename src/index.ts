import { Hono } from 'hono'
import { authRoute } from './routes/auth-route'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', authRoute)



export default app
