import { useTheme } from "@/contexts/ThemeContext";
import { UserCarProvide } from "@/contexts/users/UserCarContext";
import { useStore } from "@/hooks/useStore";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const CarDetailLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((car) => car.id === id);

  useEffect(() => {
    if (!car) {
      Toast.show({
        type: "error",
        text1: "車両が見つかりません",
      });
      router.back();
    }
  }, [car]);

  if (!car) {
    return <Redirect href="/(user)/(tabs)" />;
  }

  return (
    <UserCarProvide>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
          contentStyle: {
            backgroundColor: colors.backgroundPrimary,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "車両詳細",
            headerShadowVisible: false,
            headerTintColor: colors.primary,
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            contentStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <X size={24} color={colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="requestBulkAppraisal"
          options={{
            title: "一括査定依頼",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="[offerId]"
          options={{
            title: "買取オファー詳細",
            presentation: "modal",
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
    </UserCarProvide>
  );
};

export default CarDetailLayout;
