import { IRentalsRepository } from './../../modules/rentals/repositories/IRentalsRepository';
import { ICarsImagesRepository } from './../../modules/cars/repositories/ICarsImgesRepository';
import { ICarsRepository } from './../../modules/cars/repositories/ICarsRepository';
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { container } from "tsyringe";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import '@shared/container/providers'

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)