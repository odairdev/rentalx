import { Repository, getRepository } from 'typeorm';
import { CreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from '../../entities/User';
import { IUserRepository } from "../IUserRepository";


class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({name, password, email, driver_license, id, avatar}: CreateUserDTO): Promise<void> {
    const newUser = this.repository.create({
      name,
      password,
      email,
      driver_license,
      id,
      avatar
    })

    await this.repository.save(newUser)
  }

  async findByEmail(email: string): Promise<User> {
    const userAlreadyExists = await this.repository.findOne({ email })

    return userAlreadyExists
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })

    return user
  }
}

export { UserRepository }