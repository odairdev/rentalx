import { IDateProvider } from './DateProvider/IDateProvider';
import { container } from "tsyringe";
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  "DateProvider",
  DayjsDateProvider
)