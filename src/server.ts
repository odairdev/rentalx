import { router } from './routes/index';
import express from 'express'

const server = express()
const port = 3333

server.use(express.json())

server.use(router)

server.listen(port, () => {
  console.log('Server running on port ' + port)
})