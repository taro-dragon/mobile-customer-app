import { BulkAppraisalProvider } from "@/contexts/staff/BulkAppraisalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { SlidersHorizontal, X } from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

const BulkAppraisalBidLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      maker: undefined,
      model: undefined,
      year: undefined,
      grade: undefined,
      modelNumber: undefined,
      status: "in_progress",
    },
  });

  return (
    <FormProvider {...form}>
      <BulkAppraisalProvider>
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
                  <SlidersHorizontal size={24} color={colors.primary} />
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
          <Stack.Screen
            name="[id]"
            options={{
              title: "一括査定依頼詳細",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="bid"
            options={{
              title: "入札",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
        </Stack>
      </BulkAppraisalProvider>
    </FormProvider>
  );
};

export default BulkAppraisalBidLayout;
