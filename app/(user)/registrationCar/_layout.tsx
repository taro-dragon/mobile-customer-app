import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useNavigation, useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";

const RegistrationCarLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const form = useForm();

  const handleGoBack = useCallback(() => {
    setTimeout(() => {
      router.back();
    }, 10);
  }, [router]);

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animationDuration: 200,
          presentation: "card",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "メーカー選択",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="selectCar"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "車種選択",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <ChevronLeft size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="selectYear"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "年式選択",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <ChevronLeft size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="selectGrade"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "グレード選択",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <ChevronLeft size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="form"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "車両登録",
            gestureEnabled: false,
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.dismissTo("/(user)/(tabs)");
                }}
              >
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationCarLayout;
