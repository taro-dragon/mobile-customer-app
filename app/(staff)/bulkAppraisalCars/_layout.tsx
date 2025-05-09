import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const BulkAppraisalCarsLayout = () => {
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
      <Stack.Screen name="[id]" options={{ title: "車両詳細" }} />
    </Stack>
  );
};
export default BulkAppraisalCarsLayout;
