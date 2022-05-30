import { container } from "tsyringe";
import { Response, Request } from "express";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    try {
      const all = await listCategoryUseCase.execute();

      return response.json(all);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}

export { ListCategoryController };
