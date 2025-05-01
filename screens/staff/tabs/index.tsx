import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Car, Gavel } from "lucide-react-native";
import { useRouter } from "expo-router";

const StaffIndexScreen = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const styles = StyleSheet.create({
    button: {
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
      contentContainerStyle={{ padding: 16, gap: 24 }}
    >
      <View style={{ gap: 8 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/registrationStock");
            }}
            style={styles.button}
          >
            <Car size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              在庫車両登録
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   router.push("/registrationCar");
            // }}
            style={styles.button}
          >
            <Gavel size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              一括査定入札
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffIndexScreen;
