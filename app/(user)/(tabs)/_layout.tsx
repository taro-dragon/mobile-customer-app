import { useTheme } from "@/contexts/ThemeContext";
import { useRegistrationGuard } from "@/hooks/useRegistrationGuard";
import useUserInfoData from "@/hooks/useUserInfoData";
import useUserNotification from "@/hooks/useUserNotification";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Tabs, useRouter } from "expo-router";
import {
  House,
  MessageSquare,
  Plus,
  Settings,
  ShoppingCart,
  Tag,
} from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  useUserInfoData();
  useUserNotification();
  const { colors } = useTheme();
  const router = useRouter();
  const guard = useRegistrationGuard();
  const form = useForm();
  return (
    <FormProvider {...form}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
              backgroundColor: colors.backgroundPrimary,
              borderTopWidth: 0,
            },
            sceneStyle: {
              backgroundColor: colors.backgroundSecondary,
            },
            headerStyle: {
              backgroundColor: colors.backgroundPrimary,
            },
            headerTitleStyle: {
              color: colors.primary,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <House size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="sell"
            options={{
              title: "売る",
              tabBarIcon: ({ color }) => <Tag size={24} color={color} />,
              headerShadowVisible: false,
              headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 16,
                  }}
                  onPress={guard(() => router.push("/registrationCar"))}
                >
                  <Plus size={24} color={colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "買う",
              headerShown: false,
              headerShadowVisible: false,
              tabBarIcon: ({ color }) => (
                <ShoppingCart size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="talk"
            options={{
              title: "トーク",
              tabBarIcon: ({ color }) => (
                <MessageSquare size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "設定",
              headerShadowVisible: false,
              tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </FormProvider>
  );
}
