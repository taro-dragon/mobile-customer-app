import { Tabs } from "react-native-collapsible-tab-view";
import { ActivityIndicator } from "react-native";
import { useCarBidsContext } from "@/contexts/CarBidsContext";
import BidItem from "../CarInfo/BidItem";

const CarDetailBulkAppraisalRequestsTab = () => {
  const { bids, hasMore, loadMore } = useCarBidsContext();
  return (
    <Tabs.FlatList
      data={bids}
      renderItem={({ item }) => <BidItem bid={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
    />
  );
};

export default CarDetailBulkAppraisalRequestsTab;
