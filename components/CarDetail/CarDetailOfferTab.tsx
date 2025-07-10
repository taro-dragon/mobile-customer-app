import { Tabs } from "react-native-collapsible-tab-view";
import { ActivityIndicator, Text, View } from "react-native";
import { Book } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useCallback } from "react";
import { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import Loader from "../common/Loader";
import { useUserCarContext } from "@/contexts/users/UserCarContext";
import CarOfferItem from "../users/car/detail/offerItem";
import { useLocalSearchParams } from "expo-router";

const CarDetailOfferTab: React.FC = () => {
  const { colors, typography } = useTheme();
  const { buyOffers, isBuyOffersLoading, hasMoreBuyOffers, loadMoreBuyOffers } =
    useUserCarContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const renderItem = useCallback(
    ({ item }: { item: CarBuyOffer }) => (
      <CarOfferItem offer={item} carId={id} />
    ),
    []
  );
  const keyExtractor = useCallback((item: CarBuyOffer) => item.id, []);
  const ListEmptyComponent = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Book size={48} color={colors.iconSecondary} strokeWidth={1.5} />
        <Text
          style={{
            ...typography.heading2,
            color: colors.textSecondary,
          }}
        >
          買取オファーがありません
        </Text>
      </View>
    ),
    [colors, typography]
  );
  if (isBuyOffersLoading) {
    return (
      <Tabs.ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </Tabs.ScrollView>
    );
  }

  return (
    <Tabs.FlatList
      data={buyOffers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMoreBuyOffers ? loadMoreBuyOffers : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={
        hasMoreBuyOffers ? <ActivityIndicator size="small" /> : null
      }
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={5}
    />
  );
};

export default CarDetailOfferTab;
