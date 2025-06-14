import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const StoreLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.primary,
        },
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "店舗管理",
        }}
      />
      <Stack.Screen
        name="shopInfo"
        options={{
          title: "店舗情報",
        }}
      />
      <Stack.Screen
        name="editShopInfo"
        options={{
          title: "店舗情報編集",
        }}
      />
    </Stack>
  );
};
export default StoreLayout;
