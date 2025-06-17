import Loader from "@/components/common/Loader";
import useFetchStaff from "@/hooks/staff/useFetchStaff";
import { useStore } from "@/hooks/useStore";
import StaffDetailScreen from "@/screens/staff/staff/StaffDetail";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";

const StaffDetail = () => {
  const { id } = useLocalSearchParams();
  const { staff, isLoading, mutate } = useFetchStaff(id as string);
  const { staff: currentStaff } = useStore();
  const isCurrentStaff = useMemo(
    () => currentStaff?.id === id,
    [currentStaff, id]
  );
  useFocusEffect(
    useCallback(() => {
      mutate();
    }, [mutate])
  );
  if (isLoading || !staff) {
    return <Loader />;
  }
  return <StaffDetailScreen staff={staff} isCurrentStaff={isCurrentStaff} />;
};

export default StaffDetail;
