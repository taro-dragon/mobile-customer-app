import { FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { useTheme } from "@/contexts/ThemeContext";
import { FullCarData } from "@/types/models/carData/fullCarData";
import Select from "../formItem/RadioButton";

export const MakerSelect = () => {
  const { manufacturers } = fullCarData as FullCarData;
  return (
    <FlatList
      data={manufacturers}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      renderItem={({ item }) => (
        <Select name="maker" label={item.name} value={item.manufacturerId} />
      )}
      style={{ flex: 1 }}
    />
  );
};
