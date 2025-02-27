import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const UnauthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="onBoading"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default UnauthLayout;
