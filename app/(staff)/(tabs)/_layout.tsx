import { useTheme } from "@/contexts/ThemeContext";
import useStaffNotification from "@/hooks/staff/useStaffNotification";
import { useStore } from "@/hooks/useStore";

import { Tabs } from "expo-router";
import {
  House,
  MessageSquare,
  Search,
  SettingsIcon,
  StoreIcon,
} from "lucide-react-native";

export default function TabLayout() {
  useStaffNotification();
  const { staff } = useStore();
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
          borderTopWidth: 0,
        },
        sceneStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="talk"
        options={{
          title: "トーク",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "検索",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: staff?.isOwner ? "店舗管理" : "店舗情報",
          tabBarIcon: ({ color }) => <StoreIcon size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => <SettingsIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
