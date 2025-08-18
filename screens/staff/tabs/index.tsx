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
import TopHeader from "@/components/base/TopHeader";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StaffIndexScreen = () => {
  const { colors, typography, isDark } = useTheme();
  const router = useRouter();
  const { logout } = useLogout();
  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const { currentStore, staff } = useStore();
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
      height: 88,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 1,
    },
    usageStatus: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}
        contentContainerStyle={{
          gap: 24,
          paddingTop: headerHeight + top,
          paddingHorizontal: 16,
        }}
      >
        <TopHeader>
          <View style={{ gap: 24 }}>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Bell size={24} color={colors.white} />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                height: 48,
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
                      borderColor: colors.white,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        ...typography.heading2,
                      }}
                    >
                      {currentStore?.shopName.slice(0, 2)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ gap: 4, flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.white, ...typography.body4 }}
                >
                  {currentStore?.address1} {currentStore?.address2}{" "}
                  {currentStore?.address3}
                </Text>
                <Text style={{ color: colors.white, ...typography.heading2 }}>
                  {currentStore?.shopName}
                </Text>
              </View>
              {staff?.shops?.length && staff?.shops?.length > 1 && (
                <MoveVertical
                  onPress={() => {
                    router.push("/shopSelect");
                  }}
                  size={24}
                  color={colors.white}
                />
              )}
            </View>
          </View>
        </TopHeader>
        <TouchableOpacity
          onPress={() => {
            router.push("/projects");
          }}
          style={{
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
            borderRadius: 8,
            padding: 16,
            gap: 24,
            shadowColor: colors.shadow,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 1,
          }}
        >
          <Text
            style={{
              color: colors.textInfo,
              ...typography.heading3,
              textAlign: "center",
            }}
          >
            今月の利用状況
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={styles.usageStatus}>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                入札
              </Text>
              <Text style={{ color: colors.textPrimary, ...typography.title1 }}>
                100
              </Text>
            </View>
            <View style={styles.usageStatus}>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                マッチ
              </Text>
              <Text style={{ color: colors.textPrimary, ...typography.title1 }}>
                100
              </Text>
            </View>
            <View style={styles.usageStatus}>
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                オファー
              </Text>
              <Text style={{ color: colors.textPrimary, ...typography.title1 }}>
                100
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingBottom: 16 }}>
          <View
            style={{
              gap: 8,
            }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/projects");
                }}
                style={styles.button}
              >
                <FolderOpen size={24} color={colors.primary} />
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading3 }}
                >
                  案件管理
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/registrationStock");
                }}
                style={styles.button}
              >
                <Car size={24} color={colors.primary} />
                <Text
                  style={{ color: colors.textPrimary, ...typography.heading4 }}
                >
                  在庫車両登録
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
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
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
            新着一括査定依頼
          </Text>
          <View style={{ gap: 8 }}>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StaffIndexScreen;
