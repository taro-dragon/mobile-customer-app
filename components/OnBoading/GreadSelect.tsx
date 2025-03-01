import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import { CarForm } from "@/types/models/CarForm";
export const gradeSelect = () => {
  const { watch } = useFormContext<CarForm>();
  const { maker, model, year } = watch();
  const { manufacturers } = fullCarData as FullCarData;
  const uniqueGrades = useMemo(() => {
    const cars = manufacturers.find(
      (m) => m.manufacturerId === maker
    )?.carModels;
    const years = cars?.find((c) => c.modelId === model)?.years;
    const rawGrades = years?.find((y) => y.yearId === year)?.grades;
    return rawGrades
      ? rawGrades.filter(
          (grade, index) =>
            rawGrades.findIndex((g) => g.gradeName === grade.gradeName) ===
            index
        )
      : [];
  }, [manufacturers, maker, model, year]);
  return (
    <FlatList
      data={uniqueGrades}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      renderItem={({ item }) => (
        <Select name="grade" label={item.gradeName} value={item.gradeName} />
      )}
      style={{ flex: 1 }}
    />
  );
};
