import { Car } from "@/types/models/Car";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { Model } from "@/types/models/carData/model";
import { Year } from "@/types/models/carData/year";
import { Grade } from "@/types/models/carData/grade";

type CarDetails = {
  maker: Omit<Manufacture, "carModels">;
  model: Omit<Model, "years">;
  year: Omit<Year, "grades">;
  grade: Grade;
};

export function transformCarData(car: Car): CarDetails {
  const { manufacturers } = fullCarData as FullCarData;

  const makerData = manufacturers.find((m) => m.manufacturerId === car.maker);
  const modelData = makerData?.carModels.find((c) => c.modelId === car.model);
  const yearData = modelData?.years.find((y) => y.yearId === car.year);
  const gradeData = yearData?.grades.find((g) => g.gradeName === car.grade);

  const { carModels, ...formattedMaker } = makerData as Manufacture;
  const { years, ...formattedModel } = modelData as Model;
  const { grades, ...formattedYear } = yearData as Year;

  return {
    maker: formattedMaker,
    model: formattedModel,
    year: formattedYear,
    grade: gradeData as Grade,
  };
}
