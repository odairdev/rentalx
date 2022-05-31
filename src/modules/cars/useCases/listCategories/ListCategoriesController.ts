import { container } from "tsyringe";
import { Response, Request } from "express";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    const all = await listCategoryUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoryController };
