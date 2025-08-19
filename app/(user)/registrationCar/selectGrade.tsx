import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { ChevronRight } from "lucide-react-native";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useFetchGrades } from "@/hooks/common/carData/useFetchGrades";

const SelectGrade = () => {
  const { colors, typography } = useTheme();
  const { watch, control } = useFormContext();
  const router = useRouter();
  const maker = watch("maker");
  const model = watch("model");
  const generation = watch("generation");
  const minorModel = watch("minorModel");
  const { grades, isLoading } = useFetchGrades({
    manufacturerId: maker,
    modelId: model,
    generationId: generation,
    minorModelId: minorModel,
  });
  const {
    field: { onChange },
  } = useController({
    name: "grade",
    control,
  });
  const {
    field: { onChange: onChangeModelNumber },
  } = useController({
    name: "modelNumber",
    control,
  });

  return (
    <FlatList
      data={grades}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      renderItem={({ item }) => (
        <>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              gap: 8,
            }}
            onPress={() => {
              onChange(item.gradeName);
              onChangeModelNumber(item.modelNumber);
              router.push("/registrationCar/form");
            }}
          >
            <View style={{ flexDirection: "column", gap: 4, flex: 1 }}>
              <Text
                style={{ ...typography.heading3, color: colors.textPrimary }}
              >
                {item.gradeName}
              </Text>
              <Text
                style={{ ...typography.body2, color: colors.textSecondary }}
              >
                型式 {item.modelNumber?.trim().replace(/ /g, "")}
              </Text>
            </View>
            <ChevronRight size={24} color={colors.primary} />
          </TouchableOpacity>
          <Divider />
        </>
      )}
    />
  );
};

export default SelectGrade;
