import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { Tabs } from "react-native-collapsible-tab-view";
import CarOfferItem from "./CarOfferItem";
import { ActivityIndicator } from "react-native";

const OfferList = () => {
  const { offers, isLoading, hasMore, loadMore, refresh } =
    useCarOfferContext();
  return (
    <Tabs.FlatList
      data={offers}
      renderItem={({ item }) => <CarOfferItem offer={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
    />
  );
};

export default OfferList;
