import fs from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

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
      const categoryAlreadyExists = this.categoriesRepository.findByName(category.name)

      if(!categoryAlreadyExists) {
        this.categoriesRepository.create(category)
      }
    })
  }
}

export { ImportCategoryUseCase };
