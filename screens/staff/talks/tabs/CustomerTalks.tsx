import TalkItem from "@/components/staff/talks/TalkItem";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { MessageSquare } from "lucide-react-native";
import { Dimensions, Text, View } from "react-native";

const CustomerTalksTab = () => {
  const { staffTalks } = useStore();
  const { colors, typography } = useTheme();
  const bottomTabheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  return (
    <FlashList
      data={staffTalks}
      scrollEnabled={!!staffTalks?.length}
      estimatedItemSize={90}
      ListEmptyComponent={() => (
        <View
          style={{
            height:
              Dimensions.get("window").height - bottomTabheight - headerHeight,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            <MessageSquare
              size={48}
              color={colors.iconSecondary}
              strokeWidth={1.5}
            />
            <Text
              style={{ color: colors.textSecondary, ...typography.heading2 }}
            >
              トークがありません
            </Text>
          </View>
        </View>
      )}
      renderItem={({ item }) => <TalkItem talk={item} />}
    />
  );
};

export default CustomerTalksTab;
