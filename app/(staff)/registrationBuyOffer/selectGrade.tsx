import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import RegistrationBuyOfferSelectGradeScreen from "@/screens/staff/registrationBuyOffer/selectGrade";

const RegistrationBuyOfferSelectCar = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const year = watch("year");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  const years = useMemo(() => {
    return cars?.find((c) => c.modelId === model)?.years;
  }, [cars, model]);
  const grades = useMemo(() => {
    const allGrades = () => {
      return years?.find((y) => y.yearId === year)?.grades;
    };
    const uniqueGrades = allGrades
      ? [
          ...new Map(
            allGrades()?.map((grade) => [
              grade.gradeName + grade.modelNumber,
              grade,
            ])
          ).values(),
        ]
      : [];
    return uniqueGrades;
  }, [years, year]);

  return <RegistrationBuyOfferSelectGradeScreen grades={grades} />;
};

export default RegistrationBuyOfferSelectCar;
