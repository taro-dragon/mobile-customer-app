import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ShopProvider } from "@/contexts/ShopContext";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const ShopDetailLayout = () => {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <ShopProvider shopId={id}>
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
    </ShopProvider>
  );
};

export default ShopDetailLayout;
