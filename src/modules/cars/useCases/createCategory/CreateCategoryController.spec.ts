import request from 'supertest'
import { server } from '@shared/infra/http/app'
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';

let connection: Connection

describe('Create a category', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, '123456', 'now()')`
    )
  })  

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a car category', async () => {
    const responseToken = await request(server).post("/session").send({
      email: "admin@rentx.com",
      password: "admin"
    })

    const { token } = responseToken.body

    const response = await request(server).post("/categories").send({
      name: "Test Category",
      description: "Description Category"
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(201)
  })

  it('should be able to create a car category', async () => {
    const responseToken = await request(server).post("/session").send({
      email: "admin@rentx.com",
      password: "admin"
    })

    const { token } = responseToken.body

    const response = await request(server).post("/categories").send({
      name: "Test Category",
      description: "Description Category"
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(400)
  })
})