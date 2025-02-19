import { useTheme } from "@/contexts/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { House, MessageSquare } from "lucide-react-native";

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="talk"
        options={{
          title: "Talks",
          tabBarIcon: ({ color }) => <MessageSquare size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
