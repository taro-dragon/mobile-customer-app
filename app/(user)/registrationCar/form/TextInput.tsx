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
};

const TextInput = ({ label, name, ...props }: Props) => {
  const { colors, typography } = useTheme();
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
      </Text>
      <RNTextInput
        {...props}
        value={value}
        onChangeText={onChange}
        style={{
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          padding: 16,
          color: colors.textPrimary,
        }}
      />
    </View>
  );
};

export default TextInput;
