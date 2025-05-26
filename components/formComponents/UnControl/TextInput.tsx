import { useTheme } from "@/contexts/ThemeContext";
import { FieldErrors } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type UnControlTextInputProps = TextInputProps & {
  label: string;
  name: string;
  isRequired?: boolean;
  multiline?: boolean;
  unit?: string;
  value: string;
  onChangeText: (text: string) => void;
  errors: FieldErrors<any>;
};

const UnControlTextInput: React.FC<UnControlTextInputProps> = ({
  label,
  name,
  isRequired,
  multiline,
  unit,
  value,
  onChangeText,
  errors,
  ...props
}) => {
  const { colors, typography } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
        {isRequired && <Text style={{ color: colors.error }}>*</Text>}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          style={{
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            padding: 16,
            flex: 1,
            color: colors.textPrimary,
            height: multiline ? 120 : undefined,
            borderWidth: 1,
            borderColor: errors[name] ? colors.error : colors.borderPrimary,
          }}
        />
        {unit && (
          <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
            {unit}
          </Text>
        )}
      </View>
      {errors[name] && (
        <Text style={{ color: colors.error, ...typography.body2 }}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
};

export default UnControlTextInput;
