import Loader from "@/components/common/Loader";
import useFetchStaff from "@/hooks/staff/useFetchStaff";
import StaffDetailScreen from "@/screens/staff/staff/StaffDetail";
import { useLocalSearchParams } from "expo-router";

const StaffDetail = () => {
  const { id } = useLocalSearchParams();
  const { staff, isLoading } = useFetchStaff(id as string);
  if (isLoading || !staff) {
    return <Loader />;
  }
  return <StaffDetailScreen staff={staff} />;
};

export default StaffDetail;
