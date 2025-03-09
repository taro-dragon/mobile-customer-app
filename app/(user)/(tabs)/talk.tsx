import { useStore } from "@/hooks/useStore";
import { FlatList, Text, View } from "react-native";

const Talk = () => {
  const { talks } = useStore();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={talks}
        renderItem={({ item }) => <Text>{item.affiliateStore.shopName}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Talk;
