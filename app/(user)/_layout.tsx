import { useTheme } from "@/contexts/ThemeContext";
import useUserCarFetch from "@/hooks/useUserCarFetch";
import { Stack } from "expo-router/stack";

export default function Layout() {
  useUserCarFetch();
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="cars/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
        }}
      />
      <Stack.Screen
        name="shops/[id]"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
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
    </Stack>
  );
}
