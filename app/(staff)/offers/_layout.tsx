import { OffersProvider } from "@/contexts/staff/offers/OffersContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const OfferDetailLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <OffersProvider>
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
            title: "買取オファー一覧",
            headerBackVisible: false,
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
    </OffersProvider>
  );
};
export default OfferDetailLayout;
