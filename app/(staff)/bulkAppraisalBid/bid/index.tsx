import React from "react";
import BulkAppraisalBidBidScreen from "@/screens/staff/bulkAppraisalBid/bid";
import { useStaffListContext } from "@/contexts/staff/StaffList";
import Loader from "@/components/common/Loader";

const BulkAppraisalBidBid = () => {
  const { staffList, isLoading } = useStaffListContext();
  if (isLoading || !staffList) {
    return <Loader />;
  }
  return <BulkAppraisalBidBidScreen staffList={staffList} />;
};

export default BulkAppraisalBidBid;
