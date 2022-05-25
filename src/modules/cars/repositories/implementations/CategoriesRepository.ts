import { Category } from '../../entities/Category';
import { ICategoryRepository, ICreateCategoryDTO } from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private categories: Category[]

  private static INSTANCE: CategoryRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance() {
    if(!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository()
    } 

    return CategoryRepository.INSTANCE
  }

  create({name, description}: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const categoryAlreadyExists = this.categories.find(category =>  category.name === name)

    return categoryAlreadyExists
  }
}

export { CategoryRepository }