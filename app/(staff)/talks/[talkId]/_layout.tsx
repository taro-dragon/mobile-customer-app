import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const TalkLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.backgroundSecondary },
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="appraisalPrice"
        options={{
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: "位置情報",
          animation: "slide_from_bottom",
          gestureEnabled: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default TalkLayout;
