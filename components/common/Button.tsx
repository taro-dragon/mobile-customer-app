import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import * as LucideIcons from "lucide-react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color: string;
  fullWidth?: boolean;
  isBorder?: boolean;
  notBorder?: boolean;
  isLoading?: boolean;
  icon?: keyof typeof LucideIcons; // lucideのアイコン名
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled,
  color,
  fullWidth,
  isBorder,
  notBorder,
  isLoading,
  icon,
}) => {
  const { colors, typography } = useTheme();
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: 8,
      paddingHorizontal: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 40,
      borderRadius: 6,
      width: fullWidth ? "100%" : "auto",
      borderWidth: 1,
      gap: 8,
    };

    // 背景色の決定
    if (disabled) {
      baseStyle.backgroundColor = colors.gray200;
    } else if (notBorder || isBorder) {
      baseStyle.backgroundColor = colors.backgroundPrimary;
    } else {
      baseStyle.backgroundColor = color;
    }

    // 境界線の決定
    if (disabled) {
      baseStyle.borderColor = colors.borderPrimary;
    } else if (notBorder) {
      baseStyle.borderColor = "transparent";
    } else if (isBorder) {
      baseStyle.borderColor = color;
    } else {
      baseStyle.borderColor = "transparent";
    }

    return baseStyle;
  };

  // テキストスタイルを計算する関数
  const getTextStyle = (): TextStyle => {
    const textStyle: TextStyle = {
      ...typography.heading3,
    };

    if (disabled) {
      textStyle.color = colors.textPrimary;
    } else if (notBorder || isBorder) {
      textStyle.color = color;
    } else {
      textStyle.color = "white";
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={getButtonStyle()}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <>
          {icon && LucideIcons[icon]
            ? (() => {
                const IconComponent = LucideIcons[
                  icon as keyof typeof LucideIcons
                ] as React.ComponentType<any>;
                return IconComponent ? (
                  <IconComponent
                    size={20}
                    color={getTextStyle().color as string}
                  />
                ) : null;
              })()
            : null}
          <Text style={getTextStyle()}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
