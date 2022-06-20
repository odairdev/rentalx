import request from 'supertest'
import { server } from '@shared/infra/http/app'
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm';

let connection: Connection

describe('List all categories', () => {
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

  it('should be able to list all categories', async () => {
    const responseToken = await request(server).post("/session").send({
      email: "admin@rentx.com",
      password: "admin"
    })

    const { token } = responseToken.body

    await request(server).post("/categories").send({
      name: "Test Category",
      description: "Description Category"
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(server).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Test Category")
  })

})