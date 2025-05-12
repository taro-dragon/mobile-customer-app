import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { List, Search } from "lucide-react-native";

const SelectTargetTypeScreen = () => {
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
        <List size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          一覧から絞り込む
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderPrimary,
        }}
        onPress={() => {
          router.push("/registrationStock/searchTypeNumber");
        }}
      >
        <Search size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
          型番から絞り込む
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTargetTypeScreen;

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
