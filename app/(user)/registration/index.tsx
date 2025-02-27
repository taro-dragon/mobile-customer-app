import React, { useMemo } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { useRouter } from "expo-router";

const Registration: React.FC = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();

  const textStyles = useMemo(
    () => ({
      title: { ...typography.title1, color: colors.primary },
      body: { ...typography.body2, color: colors.textPrimary },
    }),
    [colors.primary, colors.textPrimary, typography.title1, typography.body2]
  );

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={textStyles.title}>本会員登録</Text>
          <Text style={textStyles.body}>
            買取オファーの閲覧、一括査定依頼をするには本会員登録が必要です。
          </Text>
          <Text style={textStyles.body}>
            本会員登録をしても許可をしない限り、電話番号等が加盟店に通知されることはありません。
          </Text>
        </View>
        <Divider />
        <View style={styles.bottomContainer}>
          <Button
            color={colors.primary}
            label="次へ"
            onPress={() => router.push("/(user)/registration/name")}
            fullWidth
          />
          <SafeAreaBottom />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  bottomContainer: { padding: 16 },
});

export default Registration;
