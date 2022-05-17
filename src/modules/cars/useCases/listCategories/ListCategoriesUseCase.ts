import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category } from './../../model/Category';


class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}
  execute(): Category[] {
    const all = this.categoriesRepository.list()

    return all
  }
}

export { ListCategoryUseCase }