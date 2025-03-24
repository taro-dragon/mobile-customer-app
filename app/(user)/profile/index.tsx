import Divider from "@/components/common/Divider";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { Redirect, useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const { user } = useStore();
  const { colors, typography } = useTheme();
  const router = useRouter();
  if (!user) {
    return <Redirect href="/(user)/(tabs)" />;
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.backgroundSecondary }}
    >
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: colors.backgroundPrimary,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => router.push("/(user)/profile/postalcode")}
      >
        <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
          郵便番号
        </Text>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: colors.backgroundPrimary,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() => router.push("/(user)/profile/name")}
      >
        <Text style={{ color: colors.textPrimary, ...typography.body2 }}>
          氏名
        </Text>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
