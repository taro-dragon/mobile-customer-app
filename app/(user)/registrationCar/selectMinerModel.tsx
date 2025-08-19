import { useCallback } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import ListItem from "@/components/registrationCar/ListItem";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useFetchMinorModel } from "@/hooks/common/carData/useFetchMinorModel";
import { MinorModel } from "@/types/firestore_schema/manufacturers";

const SelectYear = () => {
  const { watch, control } = useFormContext();
  const { colors } = useTheme();
  const router = useRouter();
  const maker = watch("maker");
  const model = watch("model");
  const generation = watch("generation");
  const { minorModels, isLoading } = useFetchMinorModel({
    manufacturerId: maker,
    modelId: model,
    generationId: generation,
  });

  const {
    field: { onChange },
  } = useController({
    name: "minorModel",
    control,
  });
  const {
    field: { onChange: onChangeMinorModelName },
  } = useController({
    name: "minorModelName",
    control,
  });

  const handleYearSelect = useCallback(
    (minorModel: MinorModel) => {
      onChange(minorModel.minorChangeId);
      onChangeMinorModelName(minorModel.minorChangeName);
      setTimeout(() => {
        router.push("/registrationCar/selectGrade");
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
      data={minorModels}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <ListItem
          label={item.minorChangeName}
          onPress={() => handleYearSelect(item)}
        />
      )}
    />
  );
};

export default SelectYear;
