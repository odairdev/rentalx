import multer from 'multer';
import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import  uploadConfig from '../config/upload'
import { UpdateAvatarUserController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const upadteAvatarUserController = new UpdateAvatarUserController()

usersRoutes.post("/", createUserController.handle)
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), upadteAvatarUserController.handle)