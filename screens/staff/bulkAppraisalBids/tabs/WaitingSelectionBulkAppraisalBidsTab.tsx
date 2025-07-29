import Loader from "@/components/common/Loader";
import BulkAppraisalBidsList from "@/components/staff/bulkAppraisalBids/BulkAppraisalBidsList";
import { useBulkAppraisalBidsContext } from "@/contexts/staff/bulkAppraisalBids/BulkAppraisalBidsContext";

const WaitingSelectionBulkAppraisalBidsTab = () => {
  const {
    waitingSelectionBids,
    isWaitingSelectionBidsLoading,
    waitingSelectionBidsLoadMore,
    waitingSelectionBidsHasMore,
    waitingSelectionBidsMutate,
  } = useBulkAppraisalBidsContext();
  if (isWaitingSelectionBidsLoading) {
    return <Loader />;
  }
  return (
    <BulkAppraisalBidsList
      bids={waitingSelectionBids}
      hasMore={waitingSelectionBidsHasMore}
      loadMore={waitingSelectionBidsLoadMore}
      isLoading={isWaitingSelectionBidsLoading}
      mutate={waitingSelectionBidsMutate}
    />
  );
};

export default WaitingSelectionBulkAppraisalBidsTab;
