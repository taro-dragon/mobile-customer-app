import { useTheme } from "@/contexts/ThemeContext";
import useShopOffer from "@/hooks/useFetchShopOffer";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import ShopCarOfferItem from "./ShopCarOfferItem";

const ShopOfferTab = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { offers, isLoading, hasMore, loadMore, refresh } = useShopOffer(id);
  return (
    <Tabs.FlatList
      data={offers}
      renderItem={({ item }) => <ShopCarOfferItem offer={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
    />
  );
};

export default ShopOfferTab;
