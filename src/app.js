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
  origin: clientOrigin,
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('gestion de inventario y comunicación con cocina!')
})

app.use('/api/auth', createAuthRouter({ usuarioModel: UsuarioModel }))
app.use('/api/tasks', createTasksRouter())

export default app
