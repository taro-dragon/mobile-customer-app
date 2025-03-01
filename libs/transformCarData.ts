import { Car } from "@/types/models/Car";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import { Manufacture } from "@/types/models/carData/manufacturet";
import { Model } from "@/types/models/carData/model";
import { Year } from "@/types/models/carData/year";
import { Grade } from "@/types/models/carData/grade";

type CarDetails = {
  maker: Manufacture;
  model: Model;
  year: Year;
  grade: Grade;
};

export function transformCarData(car: Car): CarDetails {
  const { manufacturers } = fullCarData as FullCarData;

  const makerData = manufacturers.find((m) => m.manufacturerId === car.maker);
  const modelData = makerData?.carModels.find((c) => c.modelId === car.model);
  const yearData = modelData?.years.find((y) => y.yearId === car.year);
  const gradeData = yearData?.grades.find((g) => g.gradeName === car.grade);

  return {
    maker: makerData as Manufacture,
    model: modelData as Model,
    year: yearData as Year,
    grade: gradeData as Grade,
  };
}
