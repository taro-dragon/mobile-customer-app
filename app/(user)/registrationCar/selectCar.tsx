import { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import ListItem from "@/components/registrationCar/ListItem";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ModelWithGenerations,
  useFetchModels,
} from "@/hooks/common/carData/useFetchModels";

const SelectCar = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { watch, control } = useFormContext();
  const maker = watch("maker");
  const { models, isLoading } = useFetchModels({
    manufacturerId: maker,
  });

  const {
    field: { onChange },
  } = useController({
    name: "model",
    control,
  });
  const {
    field: { onChange: onChangeModelName },
  } = useController({
    name: "modelName",
    control,
  });

  const handleCarSelect = useCallback(
    (model: ModelWithGenerations) => {
      onChange(model.id);
      onChangeModelName(model.name);
      if (model.hasGenerations) {
        router.push("/registrationCar/selectYear");
      } else {
        router.push("/registrationCar/form");
      }
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
      data={models}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem label={item.name} onPress={() => handleCarSelect(item)} />
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
