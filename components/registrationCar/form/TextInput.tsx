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

  const isNumeric =
    props.keyboardType === "numeric" || props.keyboardType === "number-pad";

  // 数値を3桁ごとにカンマ区切りでフォーマット
  const formatNumber = (num: number | undefined): string => {
    if (num === undefined || num === null) return "";
    return num.toLocaleString();
  };

  // カンマを除去して数値に変換
  const parseNumber = (text: string): number | undefined => {
    const cleanedText = text.replace(/,/g, "");
    if (cleanedText === "") return undefined;
    const num = Number(cleanedText);
    return isNaN(num) ? undefined : num;
  };

  const handleChange = (text: string) => {
    if (isNumeric) {
      if (text === "") {
        onChange("");
      } else {
        const numericValue = parseNumber(text);
        onChange(numericValue);
      }
    } else {
      onChange(text);
    }
  };

  // 表示用の値を取得
  const getDisplayValue = (): string => {
    if (isNumeric) {
      return value !== undefined && value !== null
        ? formatNumber(value as number)
        : "";
    }
    return value !== undefined && value !== null ? String(value) : "";
  };

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
        {isRequired && <Text style={{ color: colors.error }}>*</Text>}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
        <RNTextInput
          {...props}
          value={getDisplayValue()}
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
