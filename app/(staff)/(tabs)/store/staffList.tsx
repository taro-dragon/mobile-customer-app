import Loader from "@/components/common/Loader";
import useFetchStaffList from "@/hooks/staff/useFetchBulkAppraisalCar";
import { useStore } from "@/hooks/useStore";
import StaffListScreen from "@/screens/staff/store/storeManagement/staffList";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";

const StaffList = () => {
  const { staff, currentStore } = useStore();
  const isOwner = useMemo(() => !!staff?.isOwner, [staff]);
  const { staffList, isLoading, mutate } = useFetchStaffList(
    currentStore?.id || ""
  );
  useFocusEffect(
    useCallback(() => {
      mutate();
    }, [mutate])
  );
  if (isLoading || !staffList) {
    return <Loader />;
  }
  return <StaffListScreen staffList={staffList} isOwner={isOwner} />;
};

export default StaffList;
