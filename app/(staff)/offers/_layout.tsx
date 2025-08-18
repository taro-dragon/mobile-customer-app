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
            backgroundColor: colors.backgroundSecondary,
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
            gestureDirection: "vertical",
            headerShown: false,
            gestureEnabled: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </OffersProvider>
  );
};
export default OfferDetailLayout;
