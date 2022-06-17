import { IDateProvider } from './../../../shared/container/providers/DateProvider/IDateProvider';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { AppError } from '@errors/AppError';
import { IRentalsRepository } from './../repositories/IRentalsRepository';
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    private dayjsDateProvider: IDateProvider
  ){}

  async execute({car_id, user_id, expected_return_date}: IRequest):Promise<Rental> {
    const minimunHoursDifference = 24
    const carUnvailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnvailable) {
      throw new AppError("Car is unavailable")
    }

    const openToUserRental = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(openToUserRental) {
      throw new AppError("Rental is unavailable")
    }
    
    const compare = this.dayjsDateProvider.compareInHours(expected_return_date, this.dayjsDateProvider.dateNow(new Date()))

    if(compare < minimunHoursDifference) {
      throw new AppError(`Minimun rental time is 24, input was ${compare} hours.`)
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