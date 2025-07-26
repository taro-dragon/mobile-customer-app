import { StockCarProvider } from "@/contexts/staff/stockCars/StockCarContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const StockCarDetailLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <StockCarProvider>
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
            headerTitle: "自社在庫詳細",
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </StockCarProvider>
  );
};

export default StockCarDetailLayout;
