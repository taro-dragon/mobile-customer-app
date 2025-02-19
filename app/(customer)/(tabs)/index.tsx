import { useStore } from "@/hooks/useStore";
import { Text, View } from "react-native";

const CustomerIndex = () => {
  const { cars, carLoading } = useStore();
  console.log(cars);
  return (
    <View>
      <Text>CustomerIndex</Text>
    </View>
  );
};

export default CustomerIndex;
