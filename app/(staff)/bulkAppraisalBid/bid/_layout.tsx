import {
  RegistrationBulkAppraisalBidFormData,
  registrationBulkAppraisalBidSchema,
} from "@/constants/schemas/registrationBulkAppraisalBid";
import StaffListProvider from "@/contexts/staff/StaffList";
import { useTheme } from "@/contexts/ThemeContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

const BulkAppraisalBidBidLayout = () => {
  const { colors } = useTheme();
  const form = useForm<RegistrationBulkAppraisalBidFormData>({
    resolver: zodResolver(registrationBulkAppraisalBidSchema),
    defaultValues: {
      minBid: 0,
      maxBid: 0,
      managerStaffs: [],
    },
  });
  return (
    <FormProvider {...form}>
      <StaffListProvider>
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
            name="index"
            options={{
              title: "入札",
            }}
          />
          <Stack.Screen
            name="staffSelect"
            options={{
              title: "担当者選択",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
        </Stack>
      </StaffListProvider>
    </FormProvider>
  );
};
export default BulkAppraisalBidBidLayout;
