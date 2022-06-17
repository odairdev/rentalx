import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { AppError } from '@errors/AppError';
import { IRentalsRepository } from './../repositories/IRentalsRepository';
import { inject, injectable } from "tsyringe";


interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ){}

  async execute({car_id, user_id, expected_return_date}: IRequest):Promise<Rental> {
    const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnvailable) {
      throw new AppError("Car is unavailable")
    }

    const openToUserRental = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(openToUserRental) {
      throw new AppError("Rental is unavailable")
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }