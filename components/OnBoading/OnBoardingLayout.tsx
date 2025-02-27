import React, { ReactNode } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import SafeAreaBottom from "@/components/common/SafeAreaBottom";
import { useTheme } from "@/contexts/ThemeContext";
import { ProgressIndicator } from "./ProgressIndicator";
import { useFormContext } from "react-hook-form";

type OnBoardingLayoutProps = {
  children: ReactNode;
  onNext: () => void;
  onBack: () => void;
  fieldName: string;
  currentStep: number;
  totalSteps: number;
  title?: string;
  disabled?: boolean;
};

export const OnBoardingLayout = ({
  children,
  onNext,
  onBack,
  fieldName,
  currentStep,
  totalSteps,
  title,
  disabled,
}: OnBoardingLayoutProps) => {
  const { colors } = useTheme();
  const form = useFormContext();
  const { watch } = form;
  const fieldValue = watch(fieldName);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        {title && (
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {title}
            </Text>
          </View>
        )}

        <ProgressIndicator totalSteps={totalSteps} currentStep={currentStep} />

        <View
          style={[
            styles.content,
            { backgroundColor: colors.backgroundPrimary },
          ]}
        >
          {children}
        </View>

        <Divider />

        <View
          style={[styles.footer, { backgroundColor: colors.backgroundPrimary }]}
        >
          <Button
            color={colors.primary}
            label="次へ"
            onPress={onNext}
            fullWidth
            disabled={disabled || !fieldValue}
          />
          <Button
            color={colors.primary}
            label="前へ"
            onPress={onBack}
            fullWidth
            notBorder
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 12,
  },
});
