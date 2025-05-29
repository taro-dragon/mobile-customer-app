import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";

const { manufacturers } = fullCarData as FullCarData;

export const findCarData = {
  maker: (makerId: string) =>
    manufacturers.find((m) => m.manufacturerId === makerId),
  model: (makerId: string, modelId: string) =>
    findCarData.maker(makerId)?.carModels.find((m) => m.modelId === modelId),
  year: (makerId: string, modelId: string, yearId: string) =>
    findCarData.model(makerId, modelId)?.years.find((y) => y.yearId === yearId),
  grade: (
    makerId: string,
    modelId: string,
    yearId: string,
    gradeName: string
  ) =>
    findCarData
      .year(makerId, modelId, yearId)
      ?.grades.find((g) => g.gradeName === gradeName),
};
