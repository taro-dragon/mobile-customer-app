import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { X } from "lucide-react-native";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationStockFormData,
  registrationStockSchema,
} from "@/constants/schemas/registrationStockSchema";

const RegistrationStockLayout = () => {
  const router = useRouter();
  const form = useForm<RegistrationStockFormData>({
    resolver: zodResolver(registrationStockSchema),
    defaultValues: {
      guarantee: "",
      transmission: "",
      inspection: "",
      repairStatus: "",
      legalRepair: "",
      cruiseControl: "",
      slideDoor: "",
      carNavi: "",
      tvMonitor: "",
    },
  });
  const { colors } = useTheme();
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
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "在庫登録",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="selectDraft"
          options={{
            title: "下書きから登録",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="selectMaker"
          options={{
            title: "メーカー選択",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="selectCar"
          options={{
            title: "車種選択",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="selectYear"
          options={{
            title: "モデル選択",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="selectGrade"
          options={{
            title: "グレード選択",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="form"
          options={{
            title: "車両情報",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="searchTypeNumber"
          options={{
            title: "型番検索",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="selectTargetType"
          options={{
            title: "登録方法",
            headerBackButtonDisplayMode: "minimal",
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

export default RegistrationStockLayout;
