import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const AnswerCarCheckRequest = () => {
  const { messageId } = useLocalSearchParams<{ messageId: string }>();
  console.log(messageId);
  return (
    <View>
      <Text>{messageId}</Text>
    </View>
  );
};

export default AnswerCarCheckRequest;
