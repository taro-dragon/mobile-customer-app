import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

type TextInputProps = RNTextInputProps & {
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  secureTextEntry,
  ...props
}) => {
  const { control } = useFormContext();
  const { colors, typography } = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RNTextInput
          {...field}
          {...props}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={{
            borderWidth: 1,
            borderColor: colors.borderPrimary,
            borderRadius: 5,
            padding: 12,
            color: colors.textPrimary,
            ...typography.body2,
          }}
        />
      )}
    />
  );
};

export default TextInput;
