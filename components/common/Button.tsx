import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color: string;
  fullWidth?: boolean;
  isBorder?: boolean;
};

const Button = ({
  label,
  onPress,
  disabled,
  color,
  fullWidth,
  isBorder,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: isBorder ? "transparent" : color,
        paddingVertical: 8,
        paddingHorizontal: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 6,
        width: fullWidth ? "100%" : "auto",
        borderWidth: 1,
        borderColor: isBorder ? color : "transparent",
      }}
    >
      <Text
        style={{
          color: isBorder ? color : "white",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
