import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { Tabs } from "react-native-collapsible-tab-view";
import CarOfferItem from "./CarOfferItem";
import { ActivityIndicator, Text, View } from "react-native";
import { Book } from "lucide-react-native";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "../common/Button";
import { useCallback } from "react";
import { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import Loader from "../common/Loader";

const CarDetailOfferTab = () => {
  const { offers, hasMore, loadMore, isLoading } = useCarOfferContext();
  const { colors, typography } = useTheme();

  const renderItem = useCallback(
    ({ item }: { item: CarBuyOffer }) => <CarOfferItem offer={item} />,
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
  if (isLoading) {
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
      data={offers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMore ? loadMore : undefined}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ gap: 8, padding: 16, paddingTop: 16 }}
      style={{ flex: 1 }}
      ListFooterComponent={hasMore ? <ActivityIndicator size="small" /> : null}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={5}
    />
  );
};

export default CarDetailOfferTab;
