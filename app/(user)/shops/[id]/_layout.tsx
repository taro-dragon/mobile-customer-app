import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const ShopDetailLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "店舗詳細" }} />
    </Stack>
  );
};

export default ShopDetailLayout;
