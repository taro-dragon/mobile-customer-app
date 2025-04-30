import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react-native";
import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Text, View } from "react-native";
import { z } from "zod";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useLogout } from "@/hooks/staff/useLogout";

type LoginFormData = {
  password: string;
  passwordConfirm: string;
};

const FirstPasswordSettingScreen = () => {
  const { colors, typography } = useTheme();
  const { staff } = useStore();
  const { logout } = useLogout();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(
      z
        .object({
          password: z
            .string()
            .min(8, { message: "パスワードは8文字以上で入力してください" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
              message:
                "パスワードは半角英字と数字を組み合わせて8文字以上で入力してください",
            })
            .regex(/^[^\s_]+$/, { message: "空白や_は使用できません" }),
          passwordConfirm: z
            .string()
            .min(1, { message: "確認用パスワードを入力してください" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
              message:
                "パスワードは半角英字と数字を組み合わせて8文字以上で入力してください",
            }),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: "パスワードが一致しません",
          path: ["passwordConfirm"],
        })
    ),
  });
  const {
    field: {
      onChange: passwordChange,
      onBlur: passwordBlur,
      value: passwordValue,
    },
  } = useController({
    control,
    name: "password",
  });
  const {
    field: {
      onChange: passwordConfirmChange,
      onBlur: passwordConfirmBlur,
      value: passwordConfirmValue,
    },
  } = useController({
    control,
    name: "passwordConfirm",
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = auth().currentUser;

      if (!user) {
        Alert.alert(
          "エラー",
          "ユーザーが見つかりません。再度ログインしてください。"
        );
        return;
      }

      await user.updatePassword(data.password);
      await firestore().collection("staffs").doc(staff?.id).update({
        isFirstLogin: false,
      });
      Toast.show({
        text1: "パスワードを更新しました",
        type: "success",
      });
      router.replace("/(staff)/(tabs)");
    } catch (error: any) {
      let errorMessage = "パスワードの更新に失敗しました。";
      console.log(error);
      Alert.alert("エラー", errorMessage);
    }
  };
  const style = StyleSheet.create({
    input: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 8,
      padding: 16,
      flex: 1,
      color: colors.textPrimary,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <SafeAreaView />
          <View
            style={{ flex: 1, padding: 16, justifyContent: "space-between" }}
          >
            <View style={{ gap: 16 }}>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.backgroundSecondary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={logout}
              >
                <ArrowLeft size={24} color={colors.textPrimary} />
              </TouchableOpacity>
              <View style={{ gap: 12 }}>
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading1 }}
                >
                  パスワード設定
                </Text>
                <View
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    width: 64,
                    height: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <Lock size={24} color={colors.primary} />
                </View>
                <Text
                  style={{ color: colors.textSecondary, ...typography.body1 }}
                >
                  新しいパスワードを設定してください。
                  {""}
                  パスワードは半角英字、数字を組み合わせた8文字以上で登録してください
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TextInput
                  placeholder="新しいパスワード"
                  value={passwordValue}
                  onChangeText={passwordChange}
                  onBlur={passwordBlur}
                  style={style.input}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{ position: "absolute", right: 16 }}
                >
                  {isPasswordVisible ? (
                    <Eye size={24} color={colors.primary} />
                  ) : (
                    <EyeOff size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={{ color: colors.error }}>
                  {errors.password.message}
                </Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TextInput
                  placeholder="確認用パスワード"
                  value={passwordConfirmValue}
                  onChangeText={passwordConfirmChange}
                  onBlur={passwordConfirmBlur}
                  style={style.input}
                  secureTextEntry={!isPasswordConfirmVisible}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsPasswordConfirmVisible(!isPasswordConfirmVisible)
                  }
                  style={{ position: "absolute", right: 16 }}
                >
                  {isPasswordConfirmVisible ? (
                    <Eye size={24} color={colors.primary} />
                  ) : (
                    <EyeOff size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              </View>
              {errors.passwordConfirm && (
                <Text style={{ color: colors.error }}>
                  {errors.passwordConfirm.message}
                </Text>
              )}
            </View>
            <Button
              label="パスワードを設定する"
              onPress={handleSubmit(onSubmit)}
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

export default FirstPasswordSettingScreen;
