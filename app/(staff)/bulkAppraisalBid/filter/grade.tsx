import { useFormContext } from "react-hook-form";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import { useMemo } from "react";
import GradeFilterScreen from "@/screens/staff/bulkAppraisalBid/filter/grade";
const GradeFilter = () => {
  const { getValues } = useFormContext();
  const maker = getValues("maker");
  const model = getValues("model");
  const year = getValues("year");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  const years = useMemo(() => {
    return cars?.find((c) => c.modelId === model)?.years;
  }, [cars, model]);
  const grades = useMemo(() => {
    const allGrades = years?.find((y) => y.yearId === year)?.grades;
    // 重複するgradeと型番を排除する
    const uniqueGrades = allGrades
      ? [
          ...new Map(
            allGrades.map((grade) => [
              grade.gradeName + grade.modelNumber,
              grade,
            ])
          ).values(),
        ]
      : [];
    return uniqueGrades;
  }, [years, year]);

  return <GradeFilterScreen grades={grades} />;
};

export default GradeFilter;
