import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useNavigation, useRouter } from "expo-router";
import { ChevronLeft, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// バリデーションスキーマを定義
const registrationCarSchema = z.object({
  maker: z.string().min(1, "メーカーを選択してください"),
  model: z.string().min(1, "車種を選択してください"),
  year: z.string().min(1, "年式を選択してください"),
  grade: z.string().min(1, "グレードを選択してください"),
  front: z.string().min(1, "正面の写真を撮影してください"),
  back: z.string().min(1, "背面の写真を撮影してください"),
  left: z.string().min(1, "左側の写真を撮影してください"),
  right: z.string().min(1, "右側の写真を撮影してください"),
  interior: z.string().min(1, "内装の写真を撮影してください"),
  modelNumber: z.string().min(1, "型番を入力してください"),
  color: z.string().min(1, "色を選択してください"),
  repairStatus: z.string().min(1, "修復歴を選択してください"),
  mileage: z.string().min(1, "走行距離を選択してください"),
  sellTime: z.string().min(1, "売却時期を選択してください"),
  description: z.string().optional(),
  // オプションの写真はバリデーションに含めない
  other1: z.string().optional(),
  other2: z.string().optional(),
  other3: z.string().optional(),
  other4: z.string().optional(),
  other5: z.string().optional(),
  other6: z.string().optional(),
});

// TypeScriptの型を定義
type RegistrationCarFormData = z.infer<typeof registrationCarSchema>;

const RegistrationCarLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();

  // zodResolverを使用してバリデーションを設定
  const form = useForm<RegistrationCarFormData>({
    resolver: zodResolver(registrationCarSchema),
    defaultValues: {
      maker: "",
      model: "",
      year: "",
      grade: "",
      front: "",
      back: "",
      left: "",
      right: "",
      interior: "",
      modelNumber: "",
      color: "",
      repairStatus: "",
      mileage: "",
      sellTime: "",
      description: "",
    },
  });

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
