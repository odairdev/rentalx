import { CreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

interface IUserRepository {
  create(data: CreateUserDTO) : Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUserRepository}