import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { CreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";


class UserRepositoryInMemory implements IUserRepository {
  users: User[] = []

  async create({name, email, password, driver_license}: CreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    })

    this.users.push(user)
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)

    return user
  }
  
}

export { UserRepositoryInMemory }