import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

describe("List Cars", () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listCarsUseCase: ListCarsUseCase;

  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "BMW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([
      {
        name: "Name Car",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "BMW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
        available: true,
        id: cars[0].id
      },
    ]);
  });

  it("should be able to list all cars by available name", async () => {
    await carsRepositoryInMemory.create({
      name: "Name Car2",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "BMW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });

    const cars = await listCarsUseCase.execute({
      category_id: null,
      brand: null,
      name: "Name Car2"
    });


    expect(cars).toEqual([
      {
        name: "Name Car2",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "BMW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
        available: true,
        id: cars[0].id
      },
    ]);
  })

  it("should be able to list all cars by available brand", async () => {
    await carsRepositoryInMemory.create({
      name: "Name Car3",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "VW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
    });

    const cars = await listCarsUseCase.execute({
      category_id: null,
      brand: "VW",
      name: null
    });


    expect(cars).toEqual([
      {
        name: "Name Car3",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "VW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f93",
        available: true,
        id: cars[0].id
      },
    ]);
  })

  it("should be able to list all cars by available category_id", async () => {
    await carsRepositoryInMemory.create({
      name: "Name Car4",
      description: "Test description",
      daily_rate: 15,
      license_plate: "12aa12",
      fine_amount: 5,
      brand: "VW",
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f97",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f97",
      brand: null,
      name: null
    });


    expect(cars).toEqual([
      {
        name: "Name Car4",
        description: "Test description",
        daily_rate: 15,
        license_plate: "12aa12",
        fine_amount: 5,
        brand: "VW",
        category_id: "c2158d1e-1cab-44c8-999b-69ac297f8f97",
        available: true,
        id: cars[0].id
      },
    ]);
  })
});
