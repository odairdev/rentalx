import { AppError } from './../../../../errors/AppError';
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from 'bcryptjs'

interface IRequest {
  name: string;
  password: string;
  email: string;
  driver_license: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository) {}

    async execute({name, password, email, driver_license}: IRequest): Promise<void> {
      const userAlreadyExists = await this.userRepository.findByEmail(email)

      if(userAlreadyExists) {
        throw new AppError("Email already taken.")
      }

      const passwordHash = await hash(password, 8)

      await this.userRepository.create({
        name,
        password: passwordHash,
        email,
        driver_license
      })
    }
}

export { CreateUserUseCase }