import { Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

type CarInfoItemProps = {
  label: string;
  value: string;
};

const CarInfoItem: React.FC<CarInfoItemProps> = ({ label, value }) => {
  const { colors, typography } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ ...typography.heading3, color: colors.primary }}>
        {label}
      </Text>
      <Text style={{ ...typography.body3, color: colors.textPrimary }}>
        {value}
      </Text>
    </View>
  );
};

export default CarInfoItem;
