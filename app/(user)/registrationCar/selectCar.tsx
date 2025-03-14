import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import ListItem from "@/components/registrationCar/ListItem";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const SelectCar = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { watch, control } = useFormContext();
  const maker = watch("maker");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);

  const {
    field: { onChange },
  } = useController({
    name: "model",
    control,
  });

  return (
    <FlatList
      data={cars}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.name}
          onPress={() => {
            router.push("/registrationCar/selectYear");
            onChange(item.modelId);
          }}
        />
      )}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      }
    />
  );
};

export default SelectCar;
