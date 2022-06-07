import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const id = uuidv4()
  const password = await hash("admin", 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
    values('${id}', 'admin', 'admin@rentx.com', '${password}', true, '123456', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log("Admin seed was created!"))