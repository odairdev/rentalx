import { Car } from './../../infra/typeorm/entities/Car';
import { ICarsRepository } from "./../../repositories/ICarsRepository";
import { inject } from "tsyringe";
import { injectable } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({category_id, brand, name}: IRequest):Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(category_id, brand, name)

    return cars
  }
}

export { ListCarsUseCase };
