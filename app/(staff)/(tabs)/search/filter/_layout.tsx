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
      <Stack.Screen
        name="maker"
        options={{
          title: "メーカー",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="model"
        options={{
          title: "自動車名",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="year"
        options={{
          title: "モデル",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="grade"
        options={{
          title: "グレード",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="prefecture"
        options={{
          title: "都道府県",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default FilterLayout;
