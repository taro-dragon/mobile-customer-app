import { ActivityIndicator, FlatList, Text, View } from "react-native";
import fullCarData from "@/constants/full_car_catalog.json";
import { FullCarData } from "@/types/models/carData/fullCarData";
import ListItem from "@/components/registrationCar/ListItem";
import { useController, useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useCallback, useState, useEffect } from "react";

const RegistrationCar = () => {
  const { manufacturers } = fullCarData as FullCarData;
  const { control } = useFormContext();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (manufacturers.length > 0) {
      setIsLoading(false);
    }
  }, [manufacturers]);

  const {
    field: { onChange },
  } = useController({
    name: "maker",
    control,
  });
  const router = useRouter();

  const handleMakerSelect = useCallback(
    (manufacturerId: string) => {
      onChange(manufacturerId);
      setTimeout(() => {
        router.push("/registrationCar/selectCar");
      }, 50);
    },
    [onChange, router]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={manufacturers}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.name}
          onPress={() => handleMakerSelect(item.manufacturerId)}
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

export default RegistrationCar;
