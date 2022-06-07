import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response) {
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = request.body;

    await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return response.status(201).send()
  }
}

export { CreateCarController }
