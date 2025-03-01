import { ActivityIndicator } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ShopCarOfferItem from "./ShopCarOfferItem";
import { useShopContext } from "@/contexts/ShopContext";

const ShopOfferTab = () => {
  const { offers, hasMoreOffers, loadMoreOffers } = useShopContext();
  return (
    <Tabs.FlatList
      data={offers}
      renderItem={({ item }) => <ShopCarOfferItem offer={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMoreOffers ? loadMoreOffers : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={
        hasMoreOffers ? <ActivityIndicator size="small" /> : null
      }
    />
  );
};

export default ShopOfferTab;
