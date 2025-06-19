import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const TalksLayout = () => {
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
      <Stack.Screen name="[id]" />
    </Stack>
  );
};
export default TalksLayout;
