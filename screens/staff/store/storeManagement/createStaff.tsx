import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import TextInput from "@/components/registrationCar/form/TextInput";
import { useTheme } from "@/contexts/ThemeContext";
import { Controller, useFormContext } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

type Props = {
  onConfirm: () => void;
};

const CreateStaffScreen: React.FC<Props> = ({ onConfirm }) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();
  const { colors, typography } = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 12 }}
        >
          <TextInput name="name" label="名前" isRequired />
          <TextInput name="furigana" label="フリガナ" isRequired />
          <TextInput name="email" label="メールアドレス" isRequired />
          <TextInput name="phoneNumber" label="電話番号" />
          <TextInput name="position" label="役職" />
          <TextInput name="employeeId" label="従業員ID" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              オーナー権限
            </Text>
            <Controller
              control={control}
              name="isOwner"
              render={({ field: { onChange, value } }) => (
                <Switch onValueChange={onChange} value={value} />
              )}
            />
          </View>
        </ScrollView>
        <Divider />
        <View style={{ padding: 16 }}>
          <Button
            label="スタッフを登録"
            onPress={onConfirm}
            color={colors.primary}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateStaffScreen;
