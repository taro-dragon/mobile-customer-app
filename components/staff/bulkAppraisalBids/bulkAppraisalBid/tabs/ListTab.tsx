import Bid from "@/components/staff/bulkAppraisalCarDetail/Bid";
import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ExtendedBid } from "@/hooks/useFetchCarBids";
import { Book } from "lucide-react-native";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const ListTab = () => {
  const { typography, colors } = useTheme();
  const {
    targetBulkAppraisalBids,
    isLoadingTargetBulkAppraisalBids,
    mutateTargetBulkAppraisalBids,
    hasMoreTargetBulkAppraisalBids,
    loadMoreTargetBulkAppraisalBids,
  } = useBulkAppraisalBidContext();

  return (
    <Tabs.FlatList
      data={targetBulkAppraisalBids}
      renderItem={({ item }) => <Bid bid={item as ExtendedBid} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={
        hasMoreTargetBulkAppraisalBids
          ? loadMoreTargetBulkAppraisalBids
          : undefined
      }
      refreshControl={
        <RefreshControl
          refreshing={isLoadingTargetBulkAppraisalBids}
          onRefresh={mutateTargetBulkAppraisalBids}
        />
      }
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={
        hasMoreTargetBulkAppraisalBids ? (
          <ActivityIndicator size="small" />
        ) : null
      }
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
            gap: 16,
          }}
        >
          {isLoadingTargetBulkAppraisalBids ? (
            <ActivityIndicator size="small" />
          ) : (
            <>
              <Book size={48} color={colors.iconSecondary} strokeWidth={1.5} />
              <Text
                style={{
                  ...typography.heading2,
                  color: colors.textSecondary,
                }}
              >
                買取オファーがありません
              </Text>
            </>
          )}
        </View>
      }
    />
  );
};

export default ListTab;
