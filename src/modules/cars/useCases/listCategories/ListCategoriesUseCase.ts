import { AppError } from './../../../../errors/AppError';
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository
  ) {}
  async execute(): Promise<Category[]> {
    const all = await this.categoriesRepository.list();

    if(!all) {
      throw new AppError("Could not list categories.")
    }

    return all;
  }
}

export { ListCategoryUseCase };
