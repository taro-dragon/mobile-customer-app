import Divider from "@/components/common/Divider";
import { StaffSettingItems } from "@/constants/Settings";
import { useTheme } from "@/contexts/ThemeContext";
import { useLogout } from "@/hooks/staff/useLogout";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const StaffSettingScreen = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { logout } = useLogout();
  const { staff } = useStore();
  return (
    <ScrollView style={{ backgroundColor: colors.backgroundSecondary }}>
      {StaffSettingItems.map((item) => {
        return (
          <View key={item.title}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 24,
                paddingBottom: 8,
              }}
            >
              <Text
                style={{ color: colors.textPrimary, ...typography.heading3 }}
              >
                {item.title}
              </Text>
            </View>
            {item.content.map((content, index) => (
              <View key={content.title}>
                <TouchableOpacity
                  style={{
                    padding: 16,
                    backgroundColor: colors.backgroundPrimary,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() => router.push(content.route as any)}
                >
                  <Text
                    style={{ color: colors.textPrimary, ...typography.body2 }}
                    key={content.title}
                  >
                    {content.title}
                  </Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </TouchableOpacity>
                {index !== item.content.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        );
      })}
      <View style={{ paddingTop: 16 }}>
        <TouchableOpacity
          style={{
            padding: 16,
            backgroundColor: colors.backgroundPrimary,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => {
            Alert.alert("ログアウト", "ログアウトしますか？", [
              { text: "キャンセル", style: "cancel" },
              { text: "ログアウト", onPress: () => logout() },
            ]);
          }}
        >
          <Text style={{ color: colors.textError, ...typography.heading3 }}>
            ログアウト
          </Text>
          <ChevronRight size={16} color={colors.textError} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StaffSettingScreen;
