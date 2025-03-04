import CarOfferItem from "@/components/CarDetail/CarOfferItem";
import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { FlatList, Text, View } from "react-native";

const Offers = () => {
  const { offers, isLoading, hasMore, loadMore, refresh } =
    useCarOfferContext();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={offers}
        renderItem={({ item }) => <CarOfferItem offer={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        refreshing={isLoading}
        onRefresh={refresh}
        contentContainerStyle={{ gap: 8, padding: 16 }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>現在利用可能なオファーはありません</Text>
          </View>
        )}
        ListFooterComponent={() =>
          hasMore ? (
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text>読み込み中...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Offers;
