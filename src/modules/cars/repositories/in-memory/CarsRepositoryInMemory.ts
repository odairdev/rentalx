import { Car } from "./../../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "./../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });

    this.cars.push(car);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if(!category_id && !brand && !name) {
        if(car.available === true) {
          return car
        } else {
          return null
        }
      } else if(((category_id && car.category_id === category_id) || (brand && car.brand === brand) || (name && car.name === name))) {
        return car
      } else {
        return null
      }
    });

    return all;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === car_id)

    return car
  }
}

export { CarsRepositoryInMemory };
