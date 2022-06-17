import { container } from 'tsyringe';
import { Request, Response } from "express";
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const user_id = request.user.id
    const { car_id, expected_return_date } = request.body
    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date
    })

    return response.status(201).json(rental)

  }
}

export { CreateRentalController }