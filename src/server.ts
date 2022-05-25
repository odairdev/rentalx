import { router } from './routes/index';
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import 'reflect-metadata'
import './database'

const server = express()
const port = 3333

server.use(express.json())

server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

server.use(router)



server.listen(port, () => {
  console.log('Server running on port ' + port)
})