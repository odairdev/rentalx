import { AppError } from '@errors/AppError';
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

describe("Create a Rental", () => {

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: new Date()
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create new rental already taken", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: new Date()
      })
  
      const rentalTwo = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: new Date()
    })
    }).rejects.toBeInstanceOf(AppError)
  })
})