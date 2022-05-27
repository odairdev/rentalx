import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoryController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";


const categoriesRepository = null
const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository)
const listCategoriesController = new ListCategoryController(listCategoriesUseCase)

export {listCategoriesController}