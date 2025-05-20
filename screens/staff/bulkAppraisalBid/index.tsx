import { Dimensions, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import BulkApprisalBidItem from "@/components/staff/bulkAppraisalBid/BulkApprisalBidItem";
import { useBulkAppraisalContext } from "@/contexts/staff/BulkAppraisalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { Inbox } from "lucide-react-native";

const BulkAppraisalBidScreen = () => {
  const { requests } = useBulkAppraisalContext();
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();
  return (
    <FlashList
      data={requests}
      contentContainerStyle={{
        padding: 16,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <BulkApprisalBidItem item={item} />}
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get("window").height - headerHeight,
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
            <Inbox size={48} color={colors.iconSecondary} strokeWidth={1.5} />
            <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
              対象の査定依頼がありません
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default BulkAppraisalBidScreen;
