import { useTheme } from "@/contexts/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { z } from "zod";

const schema = z.object({
  staffIds: z.array(z.string()),
  talkName: z.string().min(1, "トーク名を入力してください"),
  talkPhoto: z.string().optional(),
});

export type FormValues = z.infer<typeof schema>;

const Layout = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const from = useForm({
    defaultValues: {
      staffIds: [],
      talkName: "",
      talkPhoto: "",
    },
    resolver: zodResolver(schema),
  });
  return (
    <FormProvider {...from}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "メンバー選択",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.dismissAll()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="talkSetting"
          options={{
            title: "トーク設定",
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

export default Layout;
