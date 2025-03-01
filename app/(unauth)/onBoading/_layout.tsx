import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

const OnBoadingLayout = () => {
  const form = useForm();
  const { colors } = useTheme();
  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="selectCar" options={{ headerShown: false }} />
        <Stack.Screen name="selectYear" options={{ headerShown: false }} />
        <Stack.Screen name="selectgrade" options={{ headerShown: false }} />
        <Stack.Screen name="captureCar" options={{ headerShown: false }} />
        <Stack.Screen name="confirm" options={{ headerShown: false }} />
        <Stack.Screen
          name="camera"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            gestureEnabled: false,
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default OnBoadingLayout;
