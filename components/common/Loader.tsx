import { useTheme } from "@/contexts/ThemeContext";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;
