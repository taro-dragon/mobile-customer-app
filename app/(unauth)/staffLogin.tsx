import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useController, useForm } from "react-hook-form";
import auth from "@react-native-firebase/auth";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";

type LoginFormData = {
  email: string;
  password: string;
};

const StaffLogin = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>();
  const {
    field: { onChange: emailChange, onBlur: emailBlur, value: emailValue },
  } = useController({
    control,
    name: "email",
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
  const onSubmit = async (data: LoginFormData) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log("User logged in successfully:", userCredential.user.uid);
      // ログイン成功後の処理（例：ダッシュボード画面へ遷移）
      //   router.replace("/(staff)");
    } catch (error: any) {
      let errorMessage = "ログインに失敗しました";
      if (error.code === "auth/invalid-email") {
        errorMessage = "メールアドレスの形式が正しくありません";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "メールアドレスまたはパスワードが間違っています";
      }
      Alert.alert("エラー", errorMessage);
    }
  };
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
                  加盟店ログイン
                </Text>
                <Text
                  style={{ ...typography.body2, color: colors.textSecondary }}
                >
                  メールアドレスとパスワードを入力してください
                </Text>
                <TextInput
                  placeholder="メールアドレス"
                  value={emailValue}
                  onChangeText={emailChange}
                  onBlur={emailBlur}
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 8,
                    padding: 16,
                    marginTop: 16,
                    color: colors.textPrimary,
                  }}
                />
                <TextInput
                  placeholder="パスワード"
                  value={passwordValue}
                  onChangeText={passwordChange}
                  onBlur={passwordBlur}
                  secureTextEntry
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
              label="ログイン"
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

export default StaffLogin;
