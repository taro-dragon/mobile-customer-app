import Loader from "@/components/common/Loader";
import BulkAppraisalBidsList from "@/components/staff/bulkAppraisalBids/BulkAppraisalBidsList";
import { useBulkAppraisalBidsContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidsContext";

const InProgressBulkAppraisalBidsTab = () => {
  const {
    inProgressBids,
    isInProgressBidsLoading,
    inProgressBidsLoadMore,
    inProgressBidsHasMore,
    inProgressBidsMutate,
  } = useBulkAppraisalBidsContext();

  if (isInProgressBidsLoading) {
    return <Loader />;
  }

  return (
    <BulkAppraisalBidsList
      bids={inProgressBids}
      hasMore={inProgressBidsHasMore}
      loadMore={inProgressBidsLoadMore}
      isLoading={isInProgressBidsLoading}
      mutate={inProgressBidsMutate}
    />
  );
};

export default InProgressBulkAppraisalBidsTab;
