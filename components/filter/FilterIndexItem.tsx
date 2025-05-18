import { useTheme } from "@/contexts/ThemeContext";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Divider from "../common/Divider";
import { useFormContext } from "react-hook-form";

type FilterIndexItemProps = {
  label: string;
  onPress: () => void;
  defaultValue: string;
  disabled?: boolean;
  value?: string;
};

const FilterIndexItem: React.FC<FilterIndexItemProps> = ({
  label,
  onPress,
  defaultValue,
  disabled,
  value,
}) => {
  const { colors, typography } = useTheme();
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={{
            ...typography.heading3,
            color: disabled ? colors.gray400 : colors.textPrimary,
            flex: 1,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {!disabled && (
            <Text style={{ ...typography.heading3, color: colors.gray700 }}>
              {value ? value : defaultValue}
            </Text>
          )}
          <ChevronRight size={24} color={colors.gray400} />
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

export default FilterIndexItem;
