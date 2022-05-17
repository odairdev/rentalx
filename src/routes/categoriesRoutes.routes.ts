import { Router } from "express";
import { createCategoryController } from '../modules/cars/useCases/createCategory/index'
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

export const categoriesRoutes = Router();

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response)
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response)
});
