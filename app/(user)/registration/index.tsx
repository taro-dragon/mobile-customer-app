import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import RegistrationLayout from "./components/RegistrationLayout";
import Alert from "@/components/common/Alert";

const Registration: React.FC = () => {
  const router = useRouter();

  return (
    <RegistrationLayout
      title="会員登録"
      onButtonPress={() => router.push("/(user)/registration/name")}
      showBackButton={false}
    >
      <View />
      <Alert
        title="機能を全て使うには会員登録が必要です"
        message="会員登録をしても許可をしない限り、電話番号等の個人情報が加盟店に通知されることはありません。"
        type="info"
      />
    </RegistrationLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
});

export default Registration;
