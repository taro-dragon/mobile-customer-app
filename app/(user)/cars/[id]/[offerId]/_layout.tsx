import { useTheme } from "@/contexts/ThemeContext";
import { Stack, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const OfferDetailLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default OfferDetailLayout;
