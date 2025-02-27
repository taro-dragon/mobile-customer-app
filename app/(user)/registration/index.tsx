import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import RegistrationLayout from "./components/RegistrationLayout";

const Registration: React.FC = () => {
  const router = useRouter();

  return (
    <RegistrationLayout
      title="本会員登録"
      description="買取オファーの閲覧、一括査定依頼をするには本会員登録が必要です。本会員登録をしても許可をしない限り、電話番号等が加盟店に通知されることはありません。"
      onButtonPress={() => router.push("/(user)/registration/name")}
      showBackButton={false}
    >
      <View />
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
