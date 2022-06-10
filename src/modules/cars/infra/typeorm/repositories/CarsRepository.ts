import { Repository, getRepository } from "typeorm";
import { Car } from "./../entities/Car";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "./../../../repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

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
    const car = this.repository.create({
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

    await this.repository.save(car);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carQuery = this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (category_id) {
      carQuery.andWhere("category_id = :category_id", { category_id });
    }

    if (brand) {
      carQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carQuery.andWhere("name = :name", { name });
    }

    const cars = await carQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({id: car_id});

    return car
  }
}

export { CarsRepository };
