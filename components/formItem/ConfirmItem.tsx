import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

type ConfirmItemProps = {
  label: string;
  value: string;
};

const ConfirmItem: React.FC<ConfirmItemProps> = ({ label, value }) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textSecondary, ...typography.title4 }}>
        {label}
      </Text>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {value}
      </Text>
    </View>
  );
};

export default ConfirmItem;
