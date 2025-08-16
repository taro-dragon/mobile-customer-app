import { StockCarsProvider } from "@/contexts/staff/stockCars/StockCarsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const StockCarsLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <StockCarsProvider>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.backgroundSecondary,
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
            title: "在庫管理",
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
          }}
        />
      </Stack>
    </StockCarsProvider>
  );
};

export default StockCarsLayout;
