import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import BulkApprisalBidItem from "@/components/staff/bulkAppraisalBid/BulkApprisalBidItem";
import { useBulkAppraisalContext } from "@/contexts/staff/BulkAppraisalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { Inbox } from "lucide-react-native";
import { RefreshControl } from "react-native";

const BulkAppraisalBidScreen = () => {
  const { requests, loadMore, isLoading, refresh } = useBulkAppraisalContext();
  const { colors, typography } = useTheme();
  const headerHeight = useHeaderHeight();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <FlashList
      data={requests}
      contentContainerStyle={{
        padding: 16,
      }}
      estimatedItemSize={126}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <BulkApprisalBidItem item={item} />}
      onEndReached={loadMore}
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get("window").height - headerHeight - 32,
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
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
    />
  );
};

export default BulkAppraisalBidScreen;
