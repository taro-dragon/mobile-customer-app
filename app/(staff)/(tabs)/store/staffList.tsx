import Loader from "@/components/common/Loader";

import { useStore } from "@/hooks/useStore";
import StaffListScreen from "@/screens/staff/store/storeManagement/staffList";

import { useMemo } from "react";

const StaffList = () => {
  const { staff, currentStoreStaffs, currentStoreStaffsLoading } = useStore();
  const isOwner = useMemo(() => !!staff?.isOwner, [staff]);

  if (currentStoreStaffsLoading || !currentStoreStaffs) {
    return <Loader />;
  }
  return <StaffListScreen staffList={currentStoreStaffs} isOwner={isOwner} />;
};

export default StaffList;
