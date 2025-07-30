import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Car, FolderOpen, Gavel, Handshake } from "lucide-react-native";
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
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.borderPrimary,
    },
    carRegistrationButton: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      height: 96,
      borderRadius: 8,
      padding: 16,
      justifyContent: "center",
      alignItems: "center",
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
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/projects");
            }}
            style={styles.carRegistrationButton}
          >
            <FolderOpen size={24} color={colors.primary} />
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
              案件管理
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                router.push("/registrationStock");
              }}
              style={styles.button}
            >
              <Car size={24} color={colors.primary} />
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                在庫車両登録
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/bulkAppraisalBid");
              }}
              style={styles.button}
            >
              <Gavel size={24} color={colors.primary} />
              <Text
                style={{ color: colors.textPrimary, ...typography.heading4 }}
              >
                一括査定入札
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/registrationBuyOffer");
              }}
              style={styles.button}
            >
              <Handshake size={24} color={colors.primary} />
              <Text
                style={{ color: colors.textPrimary, ...typography.heading4 }}
              >
                買取オファー登録
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffIndexScreen;
