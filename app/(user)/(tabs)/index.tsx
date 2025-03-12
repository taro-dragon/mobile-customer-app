import CarInfoItem from "@/components/CarInfo/CarInfoItem";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Car, List, User } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomerIndex = () => {
  const { colors, typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    carRegistrationButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      height: 96,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      height: 88,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
  });
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 8 }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("test");
        }}
        style={styles.carRegistrationButton}
      >
        <Car size={24} color={colors.primary} />
        <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
          車両登録
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={styles.secondaryButton}>
          <List size={24} color={colors.primary} />
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
            車両一覧
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <User size={24} color={colors.primary} />
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
            ユーザー情報更新
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomerIndex;
