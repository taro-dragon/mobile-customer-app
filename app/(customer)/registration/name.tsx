import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Keyboard } from "react-native";
import Divider from "@/components/common/Divider";
import TextInput from "@/components/formItem/TextInput";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";
import { useFormContext } from "react-hook-form";

const Name = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { watch } = useFormContext();
  const { familyName, givenName } = watch();
  const textStyles = useMemo(
    () => ({
      title: { ...typography.title1, color: colors.primary },
      body: { ...typography.body2, color: colors.textPrimary },
    }),
    [colors.primary, colors.textPrimary, typography.title1, typography.body2]
  );
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity onPress={() => router.back()}>
                  <ArrowLeft size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={textStyles.title}>情報登録</Text>
              <Text style={textStyles.body}>
                あなたのお名前を入力してください
              </Text>
              <TextInput
                keyboardType="default"
                name="familyName"
                placeholder="姓"
                maxLength={10}
              />
              <TextInput
                keyboardType="default"
                name="givenName"
                placeholder="名"
                maxLength={10}
              />
            </View>
            <Divider />
            <View style={styles.bottomContainer}>
              <Button
                color={colors.primary}
                label="次へ"
                onPress={() => {
                  router.replace("/(customer)/(tabs)");
                }}
                fullWidth
                disabled={!familyName || !givenName}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <SafeAreaBottom />
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

export default Name;
