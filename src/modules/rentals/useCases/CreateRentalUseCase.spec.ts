import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@errors/AppError';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
dayjs.extend(utc)

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: IDateProvider
let dayAfter24hours;

describe("Create a Rental", () => {  
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    dayAfter24hours = dayjs().subtract(3, "days")
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "1234",
      expected_return_date: dayAfter24hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create new rental already taken", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayAfter24hours
      })
  
      const rentalTwo = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayAfter24hours
    })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create new rental with less than 1 day expected return date", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "1234",
        expected_return_date: dayjs().add(8, "hours").toDate()
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})