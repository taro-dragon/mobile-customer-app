import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const FilterLayout = () => {
  const { colors } = useTheme();
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
          title: "検索",
        }}
      />
    </Stack>
  );
};

export default FilterLayout;
