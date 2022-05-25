import { Specifications } from "../../entities/Specifications";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specifications[]

  constructor() {
    this.specifications = []
  }

  create({name, description}: ICreateSpecificationDTO): void {
    const specifications = new Specifications()

    Object.assign(specifications, {
      name,
      description,
      created_at: new Date()
    })

    this.specifications.push(specifications)
  }

  findByName(name: string): Specifications {
    const specification = this.specifications.find(specification => specification.name === name)

    return specification
  }
}

export { SpecificationsRepository }