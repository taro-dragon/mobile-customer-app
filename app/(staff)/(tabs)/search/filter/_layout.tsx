import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const FilterLayout = () => {
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
        name="index"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
          title: "絞り込み",
        }}
      />
    </Stack>
  );
};

export default FilterLayout;
