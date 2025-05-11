import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { Car, FileEdit, PlusCircle } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RegistrationStockIndexScreen: React.FC = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        }}
        onPress={() => {
          router.push("/registrationStock/selectMaker");
        }}
      >
        <PlusCircle size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          新規登録
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        }}
      >
        <FileEdit size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          下書きから登録
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationStockIndexScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  button: {
    height: 88,
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
  },
});
