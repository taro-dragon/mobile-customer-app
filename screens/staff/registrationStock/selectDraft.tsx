import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StockDraft } from "@/hooks/staff/useFetchStockDrafts";
import { FlashList } from "@shopify/flash-list";
import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { transformCarData } from "@/libs/transformCarData";
import { Car } from "@/types/models/Car";
import { useFormContext } from "react-hook-form";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

type SelectDraftScreenProps = {
  StockDraft: StockDraft[];
};

const SelectDraftScreen: React.FC<SelectDraftScreenProps> = ({
  StockDraft,
}) => {
  const { setValue, reset } = useFormContext();
  const { colors, typography } = useTheme();
  const router = useRouter();
  const handleItemPress = async (item: StockDraft) => {
    reset();
    Object.entries(item).forEach(([key, value]) => {
      if (
        key !== "id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "storeId"
      ) {
        setValue(key, value);
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/registrationStock/form");
  };
  return (
    <FlashList
      data={StockDraft}
      renderItem={({ item }) => {
        const car = transformCarData(item as unknown as Car);
        return (
          <TouchableOpacity
            style={{ paddingHorizontal: 12, gap: 4, paddingVertical: 8 }}
            onPress={() => handleItemPress(item)}
          >
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
                {car.maker.name}
              </Text>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                {car.model.name}
              </Text>
            </View>
            <Text style={{ color: colors.textSecondary, ...typography.body3 }}>
              {car.year.year}
            </Text>
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              {car.grade.gradeName}
            </Text>
            <Text style={{ color: colors.textSecondary, ...typography.body3 }}>
              {dayjs(item.createdAt._seconds * 1000).format(
                "YYYY/MM/DD HH:mm:ss"
              )}
            </Text>
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};

export default SelectDraftScreen;
