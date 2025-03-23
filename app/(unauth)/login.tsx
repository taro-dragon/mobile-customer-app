import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useController, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { useState } from "react";
import Toast from "react-native-toast-message";

const phoneUtil = PhoneNumberUtil.getInstance();

const Login = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name: "phoneNumber",
  });
  const {
    field: {
      onChange: onChangeAuthCode,
      onBlur: onBlurAuthCode,
      value: valueAuthCode,
    },
  } = useController({
    control,
    name: "confirmationCode",
  });
  const onPhoneNumberSubmit = handleSubmit(async (data) => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(data.phoneNumber, "JP");
      if (!phoneUtil.isValidNumber(number)) {
        throw new Error("Invalid phone number");
      }
      const formattedNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
      const confirmationResult = await auth().signInWithPhoneNumber(
        formattedNumber
      );
      setConfirmation(confirmationResult);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      Toast.show({
        text1: "エラーが発生しました",
        type: "error",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  });
  const onAuthCodeSubmit = handleSubmit(async (data) => {
    try {
      await confirmation?.confirm(data.confirmationCode);
      Toast.show({
        text1: "ログインしました",
        text2: "おかえりなさい",
        type: "success",
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      Toast.show({
        text1: "認証エラーが発生しました",
        type: "error",
      });
    }
  });
  if (confirmation) {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              backgroundColor: colors.backgroundPrimary,
              flex: 1,
            }}
          >
            <SafeAreaView />
            <View
              style={{
                flex: 1,
                padding: 16,
                justifyContent: "space-between",
              }}
            >
              <View>
                <View style={{ gap: 8 }}>
                  <Text
                    style={{
                      ...typography.heading1,
                      color: colors.textPrimary,
                    }}
                  >
                    認証コードを入力してください
                  </Text>
                  <Text
                    style={{ ...typography.body2, color: colors.textSecondary }}
                  >
                    {value}に送信された認証コードを入力してください
                  </Text>
                  <TextInput
                    placeholder="認証コード"
                    value={valueAuthCode}
                    onChangeText={onChangeAuthCode}
                    onBlur={onBlurAuthCode}
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      borderRadius: 8,
                      padding: 16,
                      marginTop: 16,
                      color: colors.textPrimary,
                    }}
                  />
                </View>
              </View>
              <Button
                label="認証コードを確認する"
                onPress={onAuthCodeSubmit}
                color={colors.primary}
                isLoading={isSubmitting}
              />
            </View>
            <SafeAreaView />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: colors.backgroundPrimary,
            flex: 1,
          }}
        >
          <SafeAreaView />
          <View
            style={{
              flex: 1,
              padding: 16,
              justifyContent: "space-between",
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.backgroundSecondary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 32,
                }}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color={colors.textPrimary} />
              </TouchableOpacity>
              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    ...typography.heading1,
                    color: colors.textPrimary,
                  }}
                >
                  ログイン
                </Text>
                <Text
                  style={{ ...typography.body2, color: colors.textSecondary }}
                >
                  電話番号を入力してください
                </Text>
                <TextInput
                  placeholder="電話番号"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 8,
                    padding: 16,
                    marginTop: 16,
                    color: colors.textPrimary,
                  }}
                />
              </View>
            </View>
            <Button
              label="認証コードを取得する"
              onPress={onPhoneNumberSubmit}
              color={colors.primary}
              isLoading={isSubmitting}
            />
          </View>
          <SafeAreaView />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
