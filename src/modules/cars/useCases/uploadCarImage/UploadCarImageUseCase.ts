import { ICarsImagesRepository } from './../../repositories/ICarsImgesRepository';
import { inject, injectable } from 'tsyringe';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface IRequest {
  car_id: string;
  images_name: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({car_id, images_name}: IRequest):Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
    } )
  }
}

export { UploadCarImageUseCase }