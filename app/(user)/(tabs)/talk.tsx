import { FlatList, Text, View } from "react-native";

const Talk = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[]}
        renderItem={({ item }) => <Text>{item.id}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Talk;
