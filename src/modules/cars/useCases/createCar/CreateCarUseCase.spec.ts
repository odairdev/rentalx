import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRespositoryInMemory: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRespositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "BMW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });
  });

  it("should be able to create a new car with availability", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "BMW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });

    const newCar = await carsRespositoryInMemory.findByLicensePlate("12aa12")

    expect(newCar.available).toBe(true)
  });

  it("should not be able to create a new car with the same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "BMW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
      });

      await createCarUseCase.execute({
        name: "Name Car",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "BMW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
      });
    }).rejects.toBeInstanceOf(AppError)
  })
});
