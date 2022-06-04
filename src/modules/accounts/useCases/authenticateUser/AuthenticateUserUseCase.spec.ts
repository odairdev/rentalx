import { AppError } from './../../../../errors/AppError';
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserDTO } from '../../dtos/ICreateUserDTO'

let autheticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  });

  it("Should be able to authenticate user", async () => {
    const user: CreateUserDTO = {
      name: "Test",
      email: "user@test.com",
      password: "123456",
      driver_license: "1234"
    }

    await createUserUseCase.execute(user)

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  }) 

  it("Should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      const result = await autheticateUserUseCase.execute({
        email: "any@email.com",
        password: "any"
      })
    }).rejects.toBeInstanceOf(AppError)
  })});

  it("Should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      const user: CreateUserDTO = {
        name: "Test",
        email: "user@test.com",
        password: "123456",
        driver_license: "1234"
      }
  
      await createUserUseCase.execute(user)
  
      const result = await autheticateUserUseCase.execute({
        email: user.email,
        password: "12345"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
