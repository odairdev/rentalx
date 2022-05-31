import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecifictionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase
    );

    await createSpecificationsUseCase.execute({
      name,
      description,
    });

    return response.status(201).send();
  }
}

export { CreateSpecifictionController };
