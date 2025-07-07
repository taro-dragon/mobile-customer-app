import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const { colors } = useTheme();
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
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "ホーム" }}
      />
      <Stack.Screen
        name="cars"
        options={{
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="shops"
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
        name="registrationCar"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="offers"
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
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notificationInitialize"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="notificationSetting"
        options={{
          title: "通知設定",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="blockList"
        options={{
          title: "ブロックリスト",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="stockCar"
        options={{
          gestureDirection: "vertical",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
