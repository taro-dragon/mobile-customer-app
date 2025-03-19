import { useTheme } from "@/contexts/ThemeContext";
import { Check } from "lucide-react-native";
import { useController, useFormContext } from "react-hook-form";
import { Text, TouchableWithoutFeedback, View } from "react-native";

type ColorItemProps = {
  color: string;
  label: string;
  bgColor?: string;
};

const ColorItem: React.FC<ColorItemProps> = ({ color, label, bgColor }) => {
  const { control } = useFormContext();
  const { colors, typography } = useTheme();
  const {
    field: { value, onChange },
  } = useController({ control, name: "color" });
  const isSelected = value === color;
  return (
    <View style={{ gap: 4, alignItems: "center", justifyContent: "center" }}>
      <TouchableWithoutFeedback onPress={() => onChange(color)}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            backgroundColor: bgColor || color,
            borderWidth: 2,
            borderColor: isSelected ? colors.primary : colors.borderPrimary,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {isSelected && (
            <Check size={24} color={colors.primary} strokeWidth={2} />
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text
        style={{
          color: colors.textPrimary,
          ...typography.body2,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default ColorItem;
