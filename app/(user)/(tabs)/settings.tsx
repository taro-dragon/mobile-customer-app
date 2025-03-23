import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SettingItems } from "@/constants/Settings";
import { useTheme } from "@/contexts/ThemeContext";
import Divider from "@/components/common/Divider";
import { ChevronRight } from "lucide-react-native";
const MyPage = () => {
  const { colors, typography } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.backgroundSecondary }}>
      {SettingItems.map((item) => (
        <View key={item.title}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 24,
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: colors.textPrimary, ...typography.heading3 }}>
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
      ))}
    </ScrollView>
  );
};

export default MyPage;
