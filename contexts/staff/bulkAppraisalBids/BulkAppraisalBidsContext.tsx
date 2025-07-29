import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import useFetchInProgressBulkAppraisalBids from "@/hooks/staff/bulkAppraisalBids/useFetchInProgressBulkAppraisalBids";
import useFetchWaitingSelectionBulkAppraisalBids from "@/hooks/staff/bulkAppraisalBids/useFetchWaitingSelectionBulkAppraisalBids";
import useFetchFinishedBulkAppraisalBids from "@/hooks/staff/bulkAppraisalBids/useFinishedProgressBulkAppraisalBids";
import { createContext, useContext } from "react";

type BulkAppraisalBidsContextType = {
  inProgressBids: ExBulkAppraisalBid[];
  isInProgressBidsLoading: boolean;
  inProgressBidsError?: Error;
  inProgressBidsLoadMore: () => void;
  inProgressBidsHasMore: boolean;
  inProgressBidsMutate: () => void;
  waitingSelectionBids: ExBulkAppraisalBid[];
  isWaitingSelectionBidsLoading: boolean;
  waitingSelectionBidsError?: Error;
  waitingSelectionBidsLoadMore: () => void;
  waitingSelectionBidsHasMore: boolean;
  waitingSelectionBidsMutate: () => void;
  finishedBids: ExBulkAppraisalBid[];
  isFinishedBidsLoading: boolean;
  finishedBidsError?: Error;
  finishedBidsLoadMore: () => void;
  finishedBidsHasMore: boolean;
  finishedBidsMutate: () => void;
};

const BulkAppraisalBidsContext = createContext<
  BulkAppraisalBidsContextType | undefined
>(undefined);

export const BulkAppraisalBidsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    bids: inProgressBids,
    isLoading: isInProgressBidsLoading,
    error: inProgressBidsError,
    loadMore: inProgressBidsLoadMore,
    hasMore: inProgressBidsHasMore,
    mutate: inProgressBidsMutate,
  } = useFetchInProgressBulkAppraisalBids();
  const {
    bids: waitingSelectionBids,
    isLoading: isWaitingSelectionBidsLoading,
    error: waitingSelectionBidsError,
    loadMore: waitingSelectionBidsLoadMore,
    hasMore: waitingSelectionBidsHasMore,
    mutate: waitingSelectionBidsMutate,
  } = useFetchWaitingSelectionBulkAppraisalBids();
  const {
    bids: finishedBids,
    isLoading: isFinishedBidsLoading,
    error: finishedBidsError,
    loadMore: finishedBidsLoadMore,
    hasMore: finishedBidsHasMore,
    mutate: finishedBidsMutate,
  } = useFetchFinishedBulkAppraisalBids();

  return (
    <BulkAppraisalBidsContext.Provider
      value={{
        inProgressBids,
        isInProgressBidsLoading,
        inProgressBidsError,
        inProgressBidsLoadMore,
        inProgressBidsHasMore,
        inProgressBidsMutate,
        waitingSelectionBids,
        isWaitingSelectionBidsLoading,
        waitingSelectionBidsError,
        waitingSelectionBidsLoadMore,
        waitingSelectionBidsHasMore,
        waitingSelectionBidsMutate,
        finishedBids,
        isFinishedBidsLoading,
        finishedBidsError,
        finishedBidsLoadMore,
        finishedBidsHasMore,
        finishedBidsMutate,
      }}
    >
      {children}
    </BulkAppraisalBidsContext.Provider>
  );
};

export const useBulkAppraisalBidsContext = () => {
  const context = useContext(BulkAppraisalBidsContext);
  if (!context) {
    throw new Error(
      "useBulkAppraisalBidsContext must be used within a BulkAppraisalBidsProvider"
    );
  }
  return context;
};
