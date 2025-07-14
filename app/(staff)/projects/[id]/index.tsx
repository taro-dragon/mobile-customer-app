import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const ProjectDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default ProjectDetail;
