import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";
import { useFormContext } from "react-hook-form";

export const CarSelect = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  return (
    <FlatList
      data={cars}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      renderItem={({ item }) => (
        <Select name="model" label={item.name} value={item.modelId} />
      )}
      style={{ flex: 1 }}
    />
  );
};
