import TalkItem from "@/components/talks/TalkItem";
import { useStore } from "@/hooks/useStore";
import { FlatList, View } from "react-native";

const Talk = () => {
  const { talks } = useStore();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={talks}
        renderItem={({ item }) => <TalkItem talk={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Talk;
