import { useEffect, useMemo, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import ListItem from "@/components/registrationCar/ListItem";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Model } from "@/types/models/carData/model";
import { useFetchModels } from "@/hooks/common/carData/useFetchModels";

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

  const handleCarSelect = useCallback(
    (modelId: string) => {
      onChange(modelId);
      setTimeout(() => {
        router.push("/registrationCar/selectYear");
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
      data={models}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.name}
          onPress={() => handleCarSelect(item.modelId)}
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
