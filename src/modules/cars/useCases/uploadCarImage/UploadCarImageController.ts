import { container } from 'tsyringe';
import { Request, Response } from "express";
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string
}

class UploadCarImageController {
  async handle(request: Request, response: Response):Promise<Response> {
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)
    const car_id = request.params.id
    const images = request.files as IFiles[]

    const fileNames = images.map(file => file.filename)

    await uploadCarImageUseCase.execute({
      car_id,
      images_name: fileNames
    })

    return response.status(201).json()
  }
}

export { UploadCarImageController }