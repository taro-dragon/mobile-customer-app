import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

const OnBoadingLayout = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="selectCar" options={{ headerShown: false }} />
        <Stack.Screen name="selectYear" options={{ headerShown: false }} />
        <Stack.Screen name="selectGread" options={{ headerShown: false }} />
        <Stack.Screen name="captureCar" options={{ headerShown: false }} />
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
