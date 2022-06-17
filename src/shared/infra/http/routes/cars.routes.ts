import uploadConfig from '@config/upload';
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";

export const carRoutes = Router()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImageController()

carRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carRoutes.get("/available", listCarsController.handle)
carRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)