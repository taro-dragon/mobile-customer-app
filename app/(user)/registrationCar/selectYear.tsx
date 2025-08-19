import { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import ListItem from "@/components/registrationCar/ListItem";
import { useRouter } from "expo-router";
import { useFetchGenerations } from "@/hooks/common/carData/useFetchGenerations";
import { useTheme } from "@/contexts/ThemeContext";
import { Generation } from "@/types/firestore_schema/manufacturers";

const SelectYear = () => {
  const { watch, control } = useFormContext();
  const { colors } = useTheme();
  const router = useRouter();
  const maker = watch("maker");
  const model = watch("model");
  const { generations, isLoading } = useFetchGenerations({
    manufacturerId: maker,
    modelId: model,
  });

  const {
    field: { onChange },
  } = useController({
    name: "generation",
    control,
  });
  const {
    field: { onChange: onChangeGenerationName },
  } = useController({
    name: "generationName",
    control,
  });

  const handleGenerationSelect = (generation: Generation) => {
    onChange(generation.generationId);
    onChangeGenerationName(generation.fullChangeName);
    router.push("/registrationCar/selectMinerModel");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={generations}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.fullChangeName}
          onPress={() => handleGenerationSelect(item)}
        />
      )}
    />
  );
};

export default SelectYear;
