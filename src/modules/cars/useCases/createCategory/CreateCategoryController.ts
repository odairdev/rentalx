import { container } from 'tsyringe';
import { Response, Request } from "express";
import { CreateCategoryUseCase } from './CreateCategoryUseCase';


class CreateCategoryController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    try {
      await createCategoryUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}

export { CreateCategoryController };
