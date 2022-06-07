import { AppError } from './../../../../errors/AppError';
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string;
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository) {}

    async execute({email, password}: IRequest): Promise<IResponse> {
      const user = await this.userRepository.findByEmail(email)

      if(!user) {
        throw new AppError("Email or password incorrect.")
      }

      const passwordMatch = await compare(password, user.password)

      if(!passwordMatch) {
        throw new AppError("Email or password incorrect.")
      }

      const token = sign({}, "ignite", {
        subject: user.id,
        expiresIn: "1d"
      })

      const tokenReturn: IResponse = {
        user: {
          name: user.name,
          email: user.email
        },
        token
      }

      return tokenReturn
    }
}

export { AuthenticateUserUseCase }