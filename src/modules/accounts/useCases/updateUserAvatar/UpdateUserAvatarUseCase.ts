import { AppError } from './../../../../errors/AppError';
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { deleteFile } from '../../../../utils/file'

interface IRequest {
  user_id: string;
  avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository) {}

    async execute({user_id, avatar_file}: IRequest): Promise<void> {
      const user = await this.usersRepository.findById(user_id)

      if(!user) {
        throw new AppError("User does not exists.")
      }

      if(user.avatar) {
        await deleteFile(`./tmp/avatar/${user.avatar}`)
      }

      user.avatar = avatar_file

      await this.usersRepository.create(user)
    }
}

export { UpdateUserAvatarUseCase }