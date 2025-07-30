import { useBulkAppraisalBidContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidContext";
import Loader from "@/components/common/Loader";
import BulkAppraisalBidScreen from "@/screens/staff/bulkAppraisalBids/bulkAppraisalBid";

const BulkAppraisalBid = () => {
  const { isLoading } = useBulkAppraisalBidContext();
  if (isLoading) {
    return <Loader />;
  }
  return <BulkAppraisalBidScreen />;
};

export default BulkAppraisalBid;
