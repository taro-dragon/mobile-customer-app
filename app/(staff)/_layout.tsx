import { useTheme } from "@/contexts/ThemeContext";
import useStaffInfoData from "@/hooks/staff/useStaffInfoData";
import { Stack } from "expo-router/stack";

export default function Layout() {
  useStaffInfoData();
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
        name="registrationStock"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureEnabled: false,
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
        name="firstPasswordSetting"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="shopSelect" />
    </Stack>
  );
}
