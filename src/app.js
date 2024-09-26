import express from 'express'
import { PORT } from './config.js'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('gestion de inventario y comunicación con cocina!')
})

export default app