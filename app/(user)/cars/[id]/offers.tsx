import { useCarOfferContext } from "@/contexts/CarOfferContext";
import { FlatList, Text, View } from "react-native";

const Offers = () => {
  const { offers, isLoading, hasMore, loadMore, refresh } =
    useCarOfferContext();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={offers}
        renderItem={({ item }) => <Text>{item.maxPrice}</Text>}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
      />
    </View>
  );
};

export default Offers;
