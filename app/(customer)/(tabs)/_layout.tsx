import { useTheme } from "@/contexts/ThemeContext";

import { Tabs } from "expo-router";
import { House, MessageSquare, Search, Store } from "lucide-react-native";

export default function TabLayout() {
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
        headerTitleStyle: {
          color: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="talk"
        options={{
          title: "トーク",
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "検索",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
