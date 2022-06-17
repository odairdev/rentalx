import { ICreateRentalDTO } from '@modules/rentals/dtos/CreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { Repository, getRepository } from 'typeorm';
import { IRentalsRepository } from './../../../repositories/IRentalsRepository';


class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<void> {
    
  }
}

export { RentalsRepository }