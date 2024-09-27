import app from './app.js'
import { PORT } from './config.js'

const port = PORT ?? 1234

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
