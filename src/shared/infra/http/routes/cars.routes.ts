import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const carRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carRoutes.get("/available", listCarsController.handle)