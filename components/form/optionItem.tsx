import { Text, TouchableOpacity, View } from "react-native";
import { useFormContext } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { useTheme } from "@/contexts/ThemeContext";

type OptionItemProps = {
  name: string;
  label: string;
};

const OptionItem = ({ name, label }: OptionItemProps) => {
  const { setValue, watch } = useFormContext();
  const targetValue = watch(name);
  const { colors, typography } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: targetValue ? colors.primary : colors.borderPrimary,
        padding: 16,
        borderRadius: 8,
      }}
      onPress={() => setValue(name, !targetValue)}
    >
      <Text
        style={{ flex: 1, ...typography.heading3, color: colors.textPrimary }}
      >
        {label}
      </Text>
      <Checkbox color={colors.primary} value={targetValue} />
    </TouchableOpacity>
  );
};

export default OptionItem;
