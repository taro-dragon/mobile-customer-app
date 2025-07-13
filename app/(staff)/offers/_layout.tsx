import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const OfferDetailLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "買取オファー詳細",
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
export default OfferDetailLayout;
