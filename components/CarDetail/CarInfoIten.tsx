import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

type CarInfoItemProps = {
  label: string;
  value: string | number;
  multiline?: boolean;
};

const CarInfoItem: React.FC<CarInfoItemProps> = ({
  label,
  value,
  multiline = false,
}) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{
        flexDirection: multiline ? "column" : "row",
        justifyContent: "space-between",
        alignItems: multiline ? "flex-start" : "center",
        gap: 8,
        width: multiline ? "100%" : "auto",
      }}
    >
      <Text style={{ ...typography.heading3, color: colors.textSecondary }}>
        {label}
      </Text>
      <Text
        style={{
          ...typography.body3,
          color: colors.textPrimary,
          wordWrap: "break-word",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default CarInfoItem;
