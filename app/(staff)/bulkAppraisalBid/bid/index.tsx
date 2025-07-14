import React from "react";
import BulkAppraisalBidBidScreen from "@/screens/staff/bulkAppraisalBid/bid";
import Loader from "@/components/common/Loader";
import { useStore } from "@/hooks/useStore";

const BulkAppraisalBidBid = () => {
  const { currentStoreStaffs, currentStoreStaffsLoading } = useStore();
  if (currentStoreStaffsLoading || !currentStoreStaffs) {
    return <Loader />;
  }
  return <BulkAppraisalBidBidScreen staffList={currentStoreStaffs} />;
};

export default BulkAppraisalBidBid;
