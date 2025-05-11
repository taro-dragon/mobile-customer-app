import Divider from "@/components/common/Divider";
import ListItem from "@/components/registrationCar/ListItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Grade } from "@/types/models/carData/grade";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type RegistrationStockSelectGreadProps = {
  grades?: Grade[];
};

const RegistrationStockSelectGreadScreen: React.FC<
  RegistrationStockSelectGreadProps
> = ({ grades }) => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { control } = useFormContext();
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
    <FlashList
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

export default RegistrationStockSelectGreadScreen;
