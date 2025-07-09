import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

type UnControlDatePickerProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  control: Control<any>;
  minimumDate?: Date;
};
const UnControlDatePicker: React.FC<UnControlDatePickerProps> = ({
  label,
  name,
  isRequired,
  control,
  minimumDate,
}) => {
  const { colors, typography } = useTheme();
  const [open, setOpen] = useState(false);
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
        {label}
        {isRequired && <Text style={{ color: colors.error }}>*</Text>}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 8,
          padding: 16,
          flex: 1,
          borderWidth: 1,
          borderColor: errors.expiresAt ? colors.error : colors.borderPrimary,
        }}
        onPress={() => setOpen(!open)}
      >
        <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
          {field.value ? field.value.toLocaleDateString("ja-JP") : "日付を選択"}
        </Text>
      </TouchableOpacity>
      {errors.expiresAt && (
        <Text style={{ color: colors.error, ...typography.body2 }}>
          {errors[name]?.message as string}
        </Text>
      )}
      <DatePicker
        title="有効期限"
        confirmText="決定"
        cancelText="閉じる"
        modal
        open={open}
        date={field.value || new Date()}
        mode="date"
        locale="ja"
        minimumDate={minimumDate}
        onConfirm={(date) => {
          setOpen(false);
          field.onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default UnControlDatePicker;
