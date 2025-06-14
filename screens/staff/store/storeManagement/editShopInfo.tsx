import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import TextInput from "@/components/registrationCar/form/TextInput";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { useFormContext } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

type Props = {
  onConfirm: () => void;
};

const EditShopInfoScreen: React.FC<Props> = ({ onConfirm }) => {
  const { colors } = useTheme();
  const {
    formState: { isSubmitting },
  } = useFormContext();
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
          <TextInput name="holiday" label="定休日" />
          <TextInput name="businessHours" label="営業時間" />
          <TextInput name="shopCatchCopy" label="店舗キャッチコピー" />
          <TextInput name="description" multiline label="店舗説明" />
        </ScrollView>
        <Divider />
        <View style={{ padding: 16 }}>
          <Button
            label="店舗情報を更新"
            onPress={onConfirm}
            color={colors.primary}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditShopInfoScreen;
