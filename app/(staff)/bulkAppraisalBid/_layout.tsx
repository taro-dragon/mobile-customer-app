import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { Filter, Search, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const BulkAppraisalBidLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useForm();
  return (
    <FormProvider {...form}>
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
            title: "一括査定入札",
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/bulkAppraisalBid/filter")}
              >
                <Search size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="filter"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default BulkAppraisalBidLayout;
