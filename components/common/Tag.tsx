import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

const Tag: React.FC<{
  label: string;
  color: "info" | "success" | "warning" | "error" | "primary";
}> = ({ label, color }) => {
  const { colors, typography } = useTheme();
  const colorTheme = {
    info: {
      borderColor: colors.borderInfo,
      backgroundColor: colors.backgroundInfo,
      textColor: colors.textInfo,
    },
    success: {
      borderColor: colors.borderSuccess,
      backgroundColor: colors.backgroundSuccess,
      textColor: colors.textSuccess,
    },
    warning: {
      borderColor: colors.borderWarning,
      backgroundColor: colors.backgroundWarning,
      textColor: colors.textWarning,
    },
    error: {
      borderColor: colors.borderError,
      backgroundColor: colors.backgroundError,
      textColor: colors.textError,
    },
    primary: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
      textColor: colors.white,
    },
  };
  return (
    <View
      style={{
        backgroundColor: colorTheme[color].backgroundColor,
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colorTheme[color].borderColor,
      }}
    >
      <Text
        style={{ color: colorTheme[color].textColor, ...typography.heading5 }}
      >
        {label}
      </Text>
    </View>
  );
};

export default Tag;
