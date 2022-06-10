import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecficationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory, specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to a non-existing car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["12345"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new car specification", async () => {
    await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "BMW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });

    await specificationsRepositoryInMemory.create({
      name: "Teste",
      description: "Specification test"
    })

    const specificationId = (await specificationsRepositoryInMemory.findByName("Teste")).id

    const cars = await carsRepositoryInMemory.findAvailable();

    await createCarSpecificationUseCase.execute({car_id: cars[0].id, specifications_id: [specificationId]});

    const newCar = await carsRepositoryInMemory.findAvailable();

    expect(newCar[0].specifications[0].id).toBe(specificationId)

  });
});
