import { Response, Request } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      this.createCategoryUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}

export { CreateCategoryController };
