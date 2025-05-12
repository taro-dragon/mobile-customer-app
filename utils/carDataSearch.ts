import { FullCarData } from "../types/models/carData/fullCarData";
import { Manufacture } from "../types/models/carData/manufacturet";
import { Model } from "../types/models/carData/model";
import { Year } from "../types/models/carData/year";
import { Grade } from "../types/models/carData/grade";
import fullCarData from "../constants/full_car_catalog.json";
export type CarSearchResult = {
  manufacturer: Manufacture;
  model: Model;
  year: Year;
  grade: Grade;
};

export const searchByModelNumber = (modelNumber: string): CarSearchResult[] => {
  const carData = fullCarData as FullCarData;
  const results: CarSearchResult[] = [];

  for (const manufacturer of carData.manufacturers) {
    for (const model of manufacturer.carModels) {
      for (const year of model.years) {
        for (const grade of year.grades) {
          const normalizedGradeModelNumber = grade.modelNumber.replace(
            /[\s\u3000]/g,
            ""
          );
          const normalizedSearchModelNumber = modelNumber.replace(
            /[\s\u3000]/g,
            ""
          );

          if (normalizedGradeModelNumber === normalizedSearchModelNumber) {
            const { ...formattedManufacturer } = manufacturer;
            const { ...formattedModel } = model;
            const { ...formattedYear } = year;
            const { ...formattedGrade } = grade;
            results.push({
              manufacturer: formattedManufacturer,
              model: formattedModel,
              year: formattedYear,
              grade: formattedGrade,
            });
          }
        }
      }
    }
  }

  return results;
};
