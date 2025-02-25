import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

const RegistrationLayout = () => {
  const { colors } = useTheme();
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="name" />
        <Stack.Screen name="phoneAuth" />
        <Stack.Screen name="geocode" />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationLayout;
