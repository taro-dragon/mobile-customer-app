import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export const CarSelect = () => {
  const { watch } = useFormContext();
  const maker = watch("maker");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  return (
    <FlatList
      data={cars}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      keyExtractor={(item) => item.modelId}
      renderItem={({ item }) => (
        <Select name="model" label={item.name} value={item.modelId} />
      )}
      style={{ flex: 1 }}
    />
  );
};
