import { useTheme } from "@/contexts/ThemeContext";
import { Staff } from "@/types/firestore_schema/staff";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { User } from "lucide-react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

type CheckBoxStaffItemProps = {
  item: Staff;
  formName: string;
};

const CheckBoxStaffItem: React.FC<CheckBoxStaffItemProps> = ({
  item,
  formName,
}) => {
  const { colors, typography } = useTheme();
  const { setValue, watch } = useFormContext();
  const currentSelectedStaff = watch(formName) || [];
  const isSelected = currentSelectedStaff.some(
    (staffId: string) => staffId === item.id
  );
  return (
    <TouchableOpacity
      onPress={() => {
        const isSelected = currentSelectedStaff.some(
          (staffId: string) => staffId === item.id
        );

        if (isSelected) {
          const updatedStaffIds = currentSelectedStaff.filter(
            (staffId: string) => staffId !== item.id
          );
          setValue(formName, updatedStaffIds);
        } else {
          setValue(formName, [...currentSelectedStaff, item.id]);
        }
      }}
      style={{
        borderWidth: 1,
        padding: 16,
        borderColor: colors.borderPrimary,
        borderRadius: 8,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {item.profileImageUrl ? (
            <Image
              source={{ uri: item.profileImageUrl }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.backgroundSecondary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={24} color={colors.textSecondary} />
            </View>
          )}
          <View style={{ gap: 4 }}>
            <Text
              style={{
                color: colors.textPrimary,
                ...typography.heading3,
              }}
            >
              {item.name}
            </Text>
            {item.position && (
              <Text
                style={{
                  color: colors.textSecondary,
                  ...typography.body2,
                }}
              >
                {item.position}
              </Text>
            )}
          </View>
        </View>
        <Checkbox
          value={isSelected}
          color={isSelected ? colors.primary : colors.borderPrimary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CheckBoxStaffItem;
