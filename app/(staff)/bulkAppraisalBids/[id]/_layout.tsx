import { BulkAppraisalBidProvider } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const BulkAppraisalBidLayout = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <BulkAppraisalBidProvider>
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
            title: "一括査定詳細",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BulkAppraisalBidProvider>
  );
};

export default BulkAppraisalBidLayout;
