import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { createAuthRouter } from './routes/auth.routes.js'
import { createTasksRouter } from './routes/tasks.routes.js'
import { UsuarioModel } from './models/usuario.model.js'
import { CLIENT_URL } from './config.js'

const app = express()

const clientOrigin = CLIENT_URL ?? '*'

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: (origin, callback) => {
    if (clientOrigin === '*' || !origin) {
      // Si no hay un origin o si clientOrigin es '*', permite todos los orígenes
      callback(null, true)
    } else if (origin === clientOrigin) {
      // Si el origin coincide con CLIENT_ORIGIN, permite el acceso
      callback(null, true)
    } else {
      // Si no coincide, bloquea el acceso
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('gestion de inventario y comunicación con cocina!')
})

app.use('/api/auth', createAuthRouter({ usuarioModel: UsuarioModel }))
app.use('/api/tasks', createTasksRouter())

export default app
