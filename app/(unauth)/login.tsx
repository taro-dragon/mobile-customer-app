import AudiLogo from "@/components/Logos/Audi";
import ToyotaLogo from "@/components/Logos/Toyota";
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
      <AudiLogo size={48} color={colors.primary} />
      <ToyotaLogo size={48} color={colors.primary} />
    </View>
  );
};

export default Login;
