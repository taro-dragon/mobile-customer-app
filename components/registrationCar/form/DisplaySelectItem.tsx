import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";

type DisplaySelectItemProps = {
  label: string;
  value: string;
};

const DisplaySelectItem: React.FC<DisplaySelectItemProps> = ({
  label,
  value,
}) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ color: colors.textSecondary }}>{label}</Text>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {value}
      </Text>
    </View>
  );
};

export default DisplaySelectItem;
