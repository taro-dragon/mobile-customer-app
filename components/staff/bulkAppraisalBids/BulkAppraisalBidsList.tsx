import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import { Dimensions, RefreshControl, Text, View } from "react-native";
import BulkAppraisalBidsItem from "./BulkAppraisalBidsItem";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@/contexts/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { Gavel } from "lucide-react-native";

type BulkAppraisalBidsListProps = {
  bids: ExBulkAppraisalBid[];
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  mutate: () => void;
};

const BulkAppraisalBidsList: React.FC<BulkAppraisalBidsListProps> = ({
  bids,
  hasMore,
  loadMore,
  isLoading,
  mutate,
}) => {
  const { typography, colors } = useTheme();
  const headerHeight = useHeaderHeight();
  return (
    <FlashList
      data={bids}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => <BulkAppraisalBidsItem bid={item} />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!hasMore) {
          loadMore();
        }
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            mutate();
          }}
        />
      }
      ListEmptyComponent={() => (
        <View
          style={{
            height: Dimensions.get("window").height - headerHeight - 32 - 56,
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
            <Gavel size={48} color={colors.iconSecondary} strokeWidth={1.5} />
            <Text style={{ color: colors.textSecondary, ...typography.body2 }}>
              対象の車両がありません
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default BulkAppraisalBidsList;
