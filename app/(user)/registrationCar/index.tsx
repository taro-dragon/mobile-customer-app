import { ActivityIndicator, FlatList, View } from "react-native";
import ListItem from "@/components/registrationCar/ListItem";
import { useController, useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useCallback } from "react";
import { useFetchManufacturers } from "@/hooks/common/carData/useFetchManufacturers";

const RegistrationCar = () => {
  const { manufacturers, isLoading } = useFetchManufacturers();
  const { control } = useFormContext();
  const { colors } = useTheme();
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
