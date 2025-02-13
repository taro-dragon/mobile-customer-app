import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color: string;
  fullWidth?: boolean;
  isBorder?: boolean;
  notBorder?: boolean;
};

const Button = ({
  label,
  onPress,
  disabled,
  color,
  fullWidth,
  isBorder,
  notBorder,
}: ButtonProps) => {
  const { colors, typography } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled
          ? colors.gray200
          : notBorder
          ? "transparent"
          : isBorder
          ? "transparent"
          : color,
        paddingVertical: 8,
        paddingHorizontal: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 6,
        width: fullWidth ? "100%" : "auto",
        borderWidth: 1,
        borderColor: notBorder
          ? "transparent"
          : isBorder
          ? color
          : "transparent",
      }}
    >
      <Text
        style={{
          color: disabled
            ? colors.textPrimary
            : notBorder || isBorder
            ? color
            : "white",
          ...typography.heading3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
