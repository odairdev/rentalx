import fs from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      })
      .on("end", () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      })
      .on("error", err => {
        reject(console.log(err.message))
      })
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    categories.forEach(async category => {
      const categoryAlreadyExists = await this.categoriesRepository.findByName(category.name)

      if(!categoryAlreadyExists) {
        await this.categoriesRepository.create(category)
      }
    })
  }
}

export { ImportCategoryUseCase };
