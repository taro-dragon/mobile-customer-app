import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { Pencil, X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const StaffLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
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
        name="[id]"
        options={{
          title: "スタッフ情報",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "スタッフ編集",
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StaffLayout;
