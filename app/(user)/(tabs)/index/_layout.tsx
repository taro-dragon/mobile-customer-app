import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";

const Layout = () => {
  const { colors } = useTheme();
  const { push } = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "ホーム",
          headerRight: () => (
            <TouchableOpacity onPress={() => push("./todo")}>
              <Check size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="todo"
        options={{
          title: "やることリスト",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default Layout;
