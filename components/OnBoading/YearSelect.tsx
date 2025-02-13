import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";
import { useFormContext } from "react-hook-form";

export const YearSelect = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const model = watch("model");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  const years = cars?.find((c) => c.modelId === model)?.years;
  return (
    <FlatList
      data={years}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      renderItem={({ item }) => (
        <Select name="year" label={item.year} value={item.yearId} />
      )}
      style={{ flex: 1 }}
    />
  );
};
