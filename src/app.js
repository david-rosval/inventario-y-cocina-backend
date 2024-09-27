import express from 'express'
import morgan from 'morgan'
import { createAuthRouter } from './routes/auth.routes.js'

import { UsuarioModel } from './models/usuario.model.js' 

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('gestion de inventario y comunicación con cocina!')
})

app.use('/api/auth', createAuthRouter({ usuarioModel: UsuarioModel }))

export default app