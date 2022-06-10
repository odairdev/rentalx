import { ICreateSpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Repository, getRepository } from 'typeorm';
import { Specifications } from '../entities/Specifications';


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>

  constructor() {
    this.repository = getRepository(Specifications)
  }

  async create({name, description}: ICreateSpecificationDTO): Promise<void> {
    const specifications = this.repository.create({
      name,
      description
    })

    await this.repository.save(specifications)
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

  async findByIds(ids: string[]): Promise<Specifications[]> {
    const specifications =  await this.repository.findByIds(ids)

    return specifications
  }
}

export { SpecificationsRepository }