import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecifictionController } from "./CreateSpecificationController";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";


const specificationsRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpecificationsUseCase(specificationsRepository)
const createSpecificationsController = new CreateSpecifictionController(createSpecificationUseCase)

export { createSpecificationsController }