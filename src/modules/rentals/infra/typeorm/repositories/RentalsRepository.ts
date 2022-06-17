import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { Repository, getRepository } from 'typeorm';
import { IRentalsRepository } from './../../../repositories/IRentalsRepository';


class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id })
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id })
  }
}

export { RentalsRepository }