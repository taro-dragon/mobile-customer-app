import { useTheme } from "@/contexts/ThemeContext";
import { useController, useFormContext } from "react-hook-form";
import {
  TextInput as RNTextInput,
  Text,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  name: string;
  isRequired?: boolean;
  multiline?: boolean;
  unit?: string;
};

const TextInput = ({
  label,
  name,
  isRequired = false,
  multiline = false,
  unit,
  ...props
}: Props) => {
  const { colors, typography } = useTheme();
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
        {isRequired && <Text style={{ color: colors.error }}>*</Text>}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
        <RNTextInput
          {...props}
          value={value}
          onChangeText={onChange}
          multiline={multiline}
          style={{
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            padding: 16,
            flex: 1,
            color: colors.textPrimary,
            height: multiline ? 120 : undefined,
          }}
        />
        {unit && (
          <Text
            style={{
              color: colors.textPrimary,
              ...typography.body2,
              paddingBottom: 8,
            }}
          >
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TextInput;
