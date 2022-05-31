import { AppError } from './errors/AppError';
import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import 'reflect-metadata'
import './database'
import "./shared/container"
import { router } from './routes/index';

const server = express()
const port = 3333

server.use(express.json())

server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

server.use(router)

server.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  } else {
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error: " + err.message
    })
  }


})

server.listen(port, () => {
  console.log('Server running on port ' + port)
})