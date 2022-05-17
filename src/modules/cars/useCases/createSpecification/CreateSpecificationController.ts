import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";


class CreateSpecifictionController {
  constructor(private createSpecificationUseCase: CreateSpecificationsUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    try {
      this.createSpecificationUseCase.execute({
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