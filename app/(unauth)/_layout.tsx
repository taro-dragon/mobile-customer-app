import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const UnauthLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="onBoading"
        options={{
          gestureEnabled: false,
          headerTintColor: colors.primary,
          headerBackButtonDisplayMode: "minimal",
          title: "車両情報登録",
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      />
    </Stack>
  );
};

export default UnauthLayout;
