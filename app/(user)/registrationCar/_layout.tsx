import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useNavigation, useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";
import {
  RegistrationCarFormData,
  registrationCarSchema,
} from "@/constants/schemas/registrationCarSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegistrationCarLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const parent = navigation.getParent();
  console.log("parent", parent);
  const form = useForm<RegistrationCarFormData>({
    resolver: zodResolver(registrationCarSchema),
    defaultValues: {
      front: "",
      back: "",
      left: "",
      right: "",
      interior: "",
      color: "",
      description: "",
    },
  });

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.dismissTo("/(user)/(tabs)/sell");
              }}
            >
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
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
          }}
        />
        <Stack.Screen
          name="selectMinerModel"
          options={{
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTintColor: colors.primary,
            headerTitle: "マイナーチェンジ選択",
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
        <Stack.Screen
          name="camera"
          options={{
            animation: "slide_from_bottom",
            gestureEnabled: false,
            headerStyle: {
              backgroundColor: colors.gray600,
            },
            headerTintColor: colors.white,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <X size={24} color={colors.white} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationCarLayout;
