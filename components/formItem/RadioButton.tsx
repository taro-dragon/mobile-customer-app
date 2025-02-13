import { Text, TouchableOpacity } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import { useTheme } from "@/contexts/ThemeContext";

type Option = {
  label: string;
  value: string;
  name: string;
};

const Select: React.FC<Option> = ({ name, label, value }) => {
  const { colors, typography } = useTheme();
  const { control } = useFormContext();
  const {
    field: { onChange, value: formValue },
  } = useController({
    name,
    control,
  });
  const isSelected = formValue === value;

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundPrimary,
        padding: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: isSelected ? colors.primary : colors.borderPrimary,
      }}
      key={value}
      onPress={() => onChange(value)}
    >
      <Text
        style={{
          ...typography.heading3,
          color: isSelected ? colors.primary : colors.textPrimary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Select;
