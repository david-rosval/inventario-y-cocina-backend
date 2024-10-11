import app from './app.js'
import { CLIENT_URL, PORT } from './config.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  },
  connectionStateRecovery: {}
})

io.on('connection', async (socket) => {
  console.log('socket.io --> a user has connected!')

  socket.on('asignar-pedido', ({ message }) => {
    console.log('asignar-pedido', message)
    io.emit('nuevo-pedido', { message: 'Nuevo pedido asignado' })
  })

  socket.on('pedido-listo', ({ message }) => {
    console.log('asignar-pedido', message)
    io.emit('pedido-listo', { message: 'Pedido listo para entregar' })
  })

  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
