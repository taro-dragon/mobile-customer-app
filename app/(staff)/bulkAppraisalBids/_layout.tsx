import { BulkAppraisalBidsProvider } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const BulkAppraisalBidsLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <BulkAppraisalBidsProvider>
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
            title: "一括査定管理",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            gestureDirection: "vertical",
            headerShown: false,
            gestureEnabled: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </BulkAppraisalBidsProvider>
  );
};

export default BulkAppraisalBidsLayout;
