import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const AppraisalPriceDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default AppraisalPriceDetail;
