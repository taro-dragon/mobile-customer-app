import Loader from "@/components/common/Loader";
import BulkAppraisalBidsList from "@/components/staff/bulkAppraisalBids/BulkAppraisalBidsList";
import { useBulkAppraisalBidsContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidsContext";

const FinishedBulkAppraisalBidsTab = () => {
  const {
    finishedBids,
    isFinishedBidsLoading,
    finishedBidsLoadMore,
    finishedBidsHasMore,
    finishedBidsMutate,
  } = useBulkAppraisalBidsContext();

  if (isFinishedBidsLoading) {
    return <Loader />;
  }

  return (
    <BulkAppraisalBidsList
      bids={finishedBids}
      hasMore={finishedBidsHasMore}
      loadMore={finishedBidsLoadMore}
      isLoading={isFinishedBidsLoading}
      mutate={finishedBidsMutate}
    />
  );
};

export default FinishedBulkAppraisalBidsTab;
