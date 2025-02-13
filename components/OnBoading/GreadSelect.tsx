import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";
import { useFormContext } from "react-hook-form";

export const GreadSelect = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const year = watch("year");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  const years = cars?.find((c) => c.modelId === model)?.years;
  const rawGrades = years?.find((y) => y.yearId === year)?.grades;
  const uniqueGrades = rawGrades
    ? rawGrades.filter(
        (grade, index) =>
          rawGrades.findIndex((g) => g.gradeName === grade.gradeName) === index
      )
    : [];
  return (
    <FlatList
      data={uniqueGrades}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      renderItem={({ item }) => (
        <Select name="gread" label={item.gradeName} value={item.gradeName} />
      )}
      style={{ flex: 1 }}
    />
  );
};
