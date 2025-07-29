import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import { RefreshControl } from "react-native";
import BulkAppraisalBidsItem from "./BulkAppraisalBidsItem";
import { FlashList } from "@shopify/flash-list";

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
    />
  );
};

export default BulkAppraisalBidsList;
