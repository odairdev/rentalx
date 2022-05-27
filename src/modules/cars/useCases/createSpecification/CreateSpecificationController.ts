import { container } from 'tsyringe';
import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";


class CreateSpecifictionController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase)

    try {
      await createSpecificationsUseCase.execute({
        name,
        description
      })

      return response.status(201).send()
    } catch(err) {
      return response.status(400).json({error: err.message})
    }
  }
}

export { CreateSpecifictionController }