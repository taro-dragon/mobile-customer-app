import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const RegistrationCarLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useForm();
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
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
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
            headerBackButtonDisplayMode: "minimal",
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
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationCarLayout;
