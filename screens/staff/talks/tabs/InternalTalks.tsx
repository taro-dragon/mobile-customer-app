import { useState } from "react";
import { MessageSquare } from "lucide-react-native";
import { Dimensions, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList } from "@shopify/flash-list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import FAB from "@/components/buttons/FAB";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore } from "@/hooks/useStore";
import { useRouter } from "expo-router";
import InternalTalkItem from "@/components/staff/talks/InternalTalkitem";

const InternalTalksTab = () => {
  const { internalTalks } = useStore();
  const router = useRouter();
  const { colors, typography } = useTheme();
  const bottomTabheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlashList
        data={internalTalks}
        estimatedItemSize={90}
        scrollEnabled={!!internalTalks?.length}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
        onMomentumScrollBegin={() => setIsScrolling(true)}
        onMomentumScrollEnd={() => setIsScrolling(false)}
        ListEmptyComponent={() => (
          <View
            style={{
              height:
                Dimensions.get("window").height -
                bottomTabheight -
                headerHeight,
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
        renderItem={({ item }) => <InternalTalkItem talk={item} />}
      />
      <FAB
        onPress={() => {
          router.push("/createTalk");
        }}
        icon="MessageSquarePlus"
        opacity={isScrolling ? 0.5 : 1}
      />
    </View>
  );
};

export default InternalTalksTab;
