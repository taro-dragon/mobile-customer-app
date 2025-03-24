import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import Button from "@/components/common/Button";

interface RegistrationLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  buttonLabel?: string;
  onButtonPress: () => void;
  buttonDisabled?: boolean;
  loading?: boolean;
  showBackButton?: boolean;
}

const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({
  title,
  description,
  children,
  buttonLabel = "次へ",
  onButtonPress,
  buttonDisabled = false,
  loading = false,
  showBackButton = true,
}) => {
  const { colors, typography } = useTheme();
  const router = useRouter();

  const textStyles = {
    title: { ...typography.title1, color: colors.primary },
    body: { ...typography.body2, color: colors.textPrimary },
  };

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
                {showBackButton && (
                  <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={textStyles.title}>{title}</Text>
              {description && (
                <Text style={textStyles.body}>{description}</Text>
              )}
              {children}
            </View>
            <Divider />
            <View style={styles.bottomContainer}>
              <Button
                color={colors.primary}
                label={buttonLabel}
                onPress={onButtonPress}
                fullWidth
                disabled={buttonDisabled || loading}
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

export default RegistrationLayout;
