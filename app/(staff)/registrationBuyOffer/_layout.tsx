import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const RegistrationBuyOfferLayout = () => {
  const router = useRouter();
  const form = useForm();
  const handleGoBack = () => {
    router.back();
  };
  const { colors } = useTheme();
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
            title: "買取オファー登録",
            headerLeft: () => (
              <TouchableOpacity onPress={handleGoBack}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
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
            title: "買取オファー登録",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationBuyOfferLayout;
