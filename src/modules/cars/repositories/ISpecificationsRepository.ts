import { Specifications } from "../entities/Specifications";


interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({name, description}: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specifications>;
  findByIds(ids: string[]): Promise<Specifications[]>
}

export { ICreateSpecificationDTO, ISpecificationsRepository}