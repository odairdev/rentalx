import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecifictionController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

export const specificationsRoutes = Router()

const createSpecificationsController = new CreateSpecifictionController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationsController.handle)