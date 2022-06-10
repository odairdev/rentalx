import { container } from 'tsyringe';
import { Request, Response } from "express";
import { CreateCarSpecificationUseCase } from './CreateCarSpecficationUseCase';


class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const car_id = request.params.id
    const { specifications_id} = request.body
    const createCarSpeficationUseCase = container.resolve(CreateCarSpecificationUseCase)

    const car = await createCarSpeficationUseCase.execute({
      car_id,
      specifications_id
    })

    return response.status(201).json(car)
  }
}

export { CreateCarSpecificationController }