import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const ProjectLayout = () => {
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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProjectLayout;
