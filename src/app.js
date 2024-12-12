import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { createAuthRouter } from './routes/auth.routes.js'
import { createTasksRouter } from './routes/tasks.routes.js'
import { UsuarioModel } from './models/usuario.model.js'
import { CLIENT_URL } from './config.js'
import { createUserRouter } from './routes/user.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}))

app.get('/', (req, res) => {
  res.send('API de Villa 29 🍺 - Gestión de Inventario y Pedidos')
})

const usuarioModel = UsuarioModel

app.use('/api/auth', createAuthRouter({ usuarioModel }))
app.use('/api/usuarios', createUserRouter({ usuarioModel }))
app.use('/api/tasks', createTasksRouter())

export default app
