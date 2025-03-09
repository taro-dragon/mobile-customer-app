import { useTheme } from "@/contexts/ThemeContext";
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color: string;
  fullWidth?: boolean;
  isBorder?: boolean;
  notBorder?: boolean;
  isLoading?: boolean;
};

const Button = ({
  label,
  onPress,
  disabled,
  color,
  fullWidth,
  isBorder,
  notBorder,
  isLoading,
}: ButtonProps) => {
  const { colors, typography } = useTheme();
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: 8,
      paddingHorizontal: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      borderRadius: 6,
      width: fullWidth ? "100%" : "auto",
      borderWidth: 1,
    };

    // 背景色の決定
    if (disabled) {
      baseStyle.backgroundColor = colors.gray200;
    } else if (notBorder || isBorder) {
      baseStyle.backgroundColor = "transparent";
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
        <Text style={getTextStyle()}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
