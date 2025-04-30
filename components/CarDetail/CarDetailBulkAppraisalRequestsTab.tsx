import { Tabs } from "react-native-collapsible-tab-view";
import { ActivityIndicator } from "react-native";
import { useCarBidsContext } from "@/contexts/CarBidsContext";
import BidItem from "../CarInfo/BidItem";
import { useStore } from "@/hooks/useStore";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ExtendedBid } from "@/hooks/useFetchCarBids";

const CarDetailBulkAppraisalRequestsTab = () => {
  const { bids, hasMore, loadMore } = useCarBidsContext();
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((car) => car.id === id);

  const renderItem = useCallback(
    ({ item }: { item: ExtendedBid }) => <BidItem bid={item} />,
    []
  );
  const keyExtractor = useCallback((item: ExtendedBid) => item.id, []);

  return (
    <Tabs.FlatList
      data={bids}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={5}
    />
  );
};

export default CarDetailBulkAppraisalRequestsTab;
