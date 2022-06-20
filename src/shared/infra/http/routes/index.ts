import { carRoutes } from './cars.routes';
import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './usersRoutes.routes';
import { Router } from "express";
import { categoriesRoutes } from "./categoriesRoutes.routes";
import { specificationsRoutes } from "./specificationsRoutes.routes";
import { rentalRoutes } from './rentals.routes';

export const router = Router()

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/users", usersRoutes)
router.use("/session", authenticateRoutes)
router.use("/cars", carRoutes)
router.use('/rentals', rentalRoutes)