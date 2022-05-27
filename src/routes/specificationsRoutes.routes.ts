import { Router } from "express";
import { CreateSpecifictionController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

export const specificationsRoutes = Router()

const createSpecificationsController = new CreateSpecifictionController()

specificationsRoutes.post('/', createSpecificationsController.handle)