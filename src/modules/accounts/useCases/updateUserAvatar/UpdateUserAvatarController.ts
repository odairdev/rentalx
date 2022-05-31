import { container } from 'tsyringe';
import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateAvatarUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.user.id
    const avatar_file = request.file.filename

    const updateUseravatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    await updateUseravatarUseCase.execute({user_id, avatar_file})

    return response.status(204).send()
  }
}

export { UpdateAvatarUserController }