import Loader from "@/components/common/Loader";
import useFetchStaff from "@/hooks/staff/useFetchStaff";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const StaffDetail = () => {
  const { id } = useLocalSearchParams();
  const { staff, isLoading } = useFetchStaff(id as string);
  if (isLoading || !staff) {
    return <Loader />;
  }
  return (
    <View>
      <Text>{staff?.name}</Text>
    </View>
  );
};

export default StaffDetail;
