import { Category } from "../../entities/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "../ICategoryRepository";


class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      avatar: null,
      created_at: new Date()
    })

    this.categories.push(category)
  }


  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)

    return category
  }
  async list(): Promise<Category[]>{
    const all = this.categories

    return all
  };
}

export { CategoriesRepositoryInMemory }