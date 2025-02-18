import { useTheme } from "@/contexts/ThemeContext";
import { SafeAreaView, View } from "react-native";

const Login = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.backgroundPrimary,
        flex: 1,
      }}
    >
      <SafeAreaView />
    </View>
  );
};

export default Login;
