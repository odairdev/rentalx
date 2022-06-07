import { Car } from './../infra/typeorm/entities/Car';
import { ICreateCarDTO } from './../dtos/ICreateCarDTO';


export interface ICarsRepository {
  create({name, description, daily_rate, license_plate, fine_amount, brand, category_id}:ICreateCarDTO): Promise<void>
  findByLicensePlate(license_plate: string): Promise<Car>
}