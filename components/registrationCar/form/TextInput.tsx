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
  editable = true,
  ...props
}: Props) => {
  const { colors, typography } = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const handleChange = (text: string) => {
    if (
      props.keyboardType === "numeric" ||
      props.keyboardType === "number-pad"
    ) {
      // 空文字列の場合はundefined、それ以外は数値に変換
      const numericValue = text === "" ? undefined : Number(text);
      onChange(numericValue);
    } else {
      onChange(text);
    }
  };

  // 表示用の値を文字列に変換
  const displayValue =
    value !== undefined && value !== null ? String(value) : "";

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
        {isRequired && <Text style={{ color: colors.error }}>*</Text>}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
        <RNTextInput
          {...props}
          value={displayValue}
          onChangeText={handleChange}
          multiline={multiline}
          editable={editable}
          style={{
            backgroundColor: editable
              ? colors.backgroundSecondary
              : colors.backgroundPrimary,
            borderRadius: 8,
            padding: 16,
            flex: 1,
            color: editable ? colors.textPrimary : colors.textSecondary,
            height: multiline ? 120 : undefined,
            borderWidth: 1,
            borderColor: errors[name] ? colors.error : colors.borderPrimary,
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
      {errors[name] && (
        <Text style={{ color: colors.error, ...typography.body2 }}>
          {errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
};

export default TextInput;
