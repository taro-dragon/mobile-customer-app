import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";

import { FullCarData } from "@/types/models/carData/fullCarData";
import fullCarData from "@/constants/full_car_catalog.json";
import { ChevronRight } from "lucide-react-native";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";

const SelectGrade = () => {
  const { colors, typography } = useTheme();
  const { watch, control } = useFormContext();
  const router = useRouter();
  const maker = watch("maker");
  const model = watch("model");
  const year = watch("year");
  const { manufacturers } = fullCarData as FullCarData;
  const cars = useMemo(() => {
    return manufacturers.find((m) => m.manufacturerId === maker)?.carModels;
  }, [manufacturers, maker]);
  const years = useMemo(() => {
    return cars?.find((c) => c.modelId === model)?.years;
  }, [cars, model]);
  const grades = useMemo(() => {
    return years?.find((y) => y.yearId === year)?.grades;
  }, [years, year]);

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
              const modelNumber = item.modelNumber?.trim().replace(/ /g, "");
              onChange(item.gradeName);
              onChangeModelNumber(modelNumber);
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
