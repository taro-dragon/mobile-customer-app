import { useTheme } from "@/contexts/ThemeContext";
import useUserInfoData from "@/hooks/useUserInfoData";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  useUserInfoData();
  const { colors } = useTheme();
  const router = useRouter();
  return (
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="cars/[id]"
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          headerShown: false,
          title: "車両詳細",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="shops/[id]"
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="registration"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="offers/[id]"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="bids/[id]"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="talks/[talkId]"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
