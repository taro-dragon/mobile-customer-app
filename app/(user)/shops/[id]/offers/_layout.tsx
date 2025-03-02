import { Stack, useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

const OffersLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[offerId]"
        options={{
          title: "買取オファー",
          contentStyle: { backgroundColor: colors.backgroundPrimary },
        }}
      />
    </Stack>
  );
};

export default OffersLayout;
