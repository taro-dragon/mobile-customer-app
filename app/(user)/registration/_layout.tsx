import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { RegistrationFormData } from "./types";

const RegistrationLayout = () => {
  const { colors } = useTheme();
  const methods = useForm<RegistrationFormData>({
    defaultValues: {
      familyName: "",
      givenName: "",
      postalCode: "",
      address1: "",
      address2: "",
      address3: "",
      lat: 0,
      lng: 0,
      phoneNumber: "",
    },
  });

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
        <Stack.Screen name="geocode" />
        <Stack.Screen name="phoneAuth" />
      </Stack>
    </FormProvider>
  );
};

export default RegistrationLayout;
