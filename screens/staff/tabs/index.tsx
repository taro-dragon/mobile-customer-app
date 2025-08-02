import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Bell,
  Car,
  FolderOpen,
  Gavel,
  Handshake,
  LogOut,
  MoveVertical,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useLogout } from "@/hooks/staff/useLogout";
import { useStore } from "@/hooks/useStore";
import { Image } from "expo-image";
import Divider from "@/components/common/Divider";

const StaffIndexScreen = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { logout } = useLogout();
  const { currentStore, staff } = useStore();
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
    <View style={{ flex: 1 }}>
      <View
        style={{
          gap: 8,
          padding: 16,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {currentStore?.imageUrls?.[0] ? (
            <Image
              source={{ uri: currentStore?.imageUrls?.[0] }}
              style={{ width: 48, height: 48, borderRadius: 8 }}
            />
          ) : (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  ...typography.heading3,
                }}
              >
                {currentStore?.shopName.slice(0, 2)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            gap: 8,
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ gap: 4 }}>
            <Text style={{ color: colors.textPrimary, ...typography.heading2 }}>
              {currentStore?.shopName}
            </Text>
            <Text
              numberOfLines={1}
              style={{ color: colors.textSecondary, ...typography.body3 }}
            >
              {currentStore?.address1} {currentStore?.address2}{" "}
              {currentStore?.address3}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            {staff?.shops?.length && staff?.shops?.length > 1 && (
              <TouchableOpacity
                onPress={() => {
                  router.push("/shopSelect");
                }}
                style={{
                  backgroundColor: colors.backgroundSecondary,
                  padding: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.borderPrimary,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <MoveVertical size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: colors.backgroundSecondary,
                padding: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.borderPrimary,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Bell size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 24 }}
      >
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
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity onPress={logout} style={styles.button}>
              <LogOut size={24} color={colors.primary} />
              <Text
                style={{ color: colors.textPrimary, ...typography.heading4 }}
              >
                ログアウト
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StaffIndexScreen;
