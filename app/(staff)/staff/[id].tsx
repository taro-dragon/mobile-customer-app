import Loader from "@/components/common/Loader";
import useFetchStaff from "@/hooks/staff/useFetchStaff";
import { useStore } from "@/hooks/useStore";
import StaffDetailScreen from "@/screens/staff/staff/StaffDetail";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const StaffDetail = () => {
  const { id } = useLocalSearchParams();
  const { staff, isLoading } = useFetchStaff(id as string);
  const { staff: currentStaff } = useStore();
  const isCurrentStaff = useMemo(
    () => currentStaff?.id === id,
    [currentStaff, id]
  );
  if (isLoading || !staff) {
    return <Loader />;
  }
  return <StaffDetailScreen staff={staff} isCurrentStaff={isCurrentStaff} />;
};

export default StaffDetail;
