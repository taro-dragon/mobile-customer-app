import { useTheme } from "@/contexts/ThemeContext";
import useUserInfoData from "@/hooks/useUserInfoData";
import useUserNotification from "@/hooks/useUserNotification";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Tabs } from "expo-router";
import {
  House,
  MessageSquare,
  Settings,
  ShoppingCart,
  Tag,
} from "lucide-react-native";
import { FormProvider, useForm } from "react-hook-form";

export default function TabLayout() {
  useUserInfoData();
  useUserNotification();
  const { colors } = useTheme();
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
              title: "ホーム",
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
              headerShadowVisible: true,
              tabBarIcon: ({ color }) => (
                <MessageSquare size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "設定",
              tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </FormProvider>
  );
}
