import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const TalkLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.backgroundSecondary },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default TalkLayout;
