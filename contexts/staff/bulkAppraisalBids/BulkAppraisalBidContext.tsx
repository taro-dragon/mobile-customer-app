import { useFetchBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/bulkAppraisalBid/useFetchBulkAppraisalBid";
import {
  TargetBulkAppraisalBid,
  useFetchTargetBulkAppraisalBids,
} from "@/hooks/staff/bulkAppraisalBids/bulkAppraisalBid/useFetchTargetBulkAppraisalBids";
import { ExBulkAppraisalBid } from "@/hooks/staff/bulkAppraisalBids/type";
import { useLocalSearchParams } from "expo-router";
import { createContext } from "react";
import { useContext } from "react";

type BulkAppraisalBidsContextType = {
  bulkAppraisalBid: ExBulkAppraisalBid;
  isLoading: boolean;
  error?: Error;
  mutate: () => void;
  targetBulkAppraisalBids: TargetBulkAppraisalBid[];
  isLoadingTargetBulkAppraisalBids: boolean;
  errorTargetBulkAppraisalBids: Error;
  mutateTargetBulkAppraisalBids: () => void;
  hasMoreTargetBulkAppraisalBids: boolean;
  loadMoreTargetBulkAppraisalBids: () => void;
};

const BulkAppraisalBidContext = createContext<
  BulkAppraisalBidsContextType | undefined
>(undefined);

export const BulkAppraisalBidProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: bulkAppraisalBid,
    isLoading,
    error,
    mutate,
  } = useFetchBulkAppraisalBid(id);
  const {
    bids: targetBulkAppraisalBids,
    isLoading: isLoadingTargetBulkAppraisalBids,
    error: errorTargetBulkAppraisalBids,
    mutate: mutateTargetBulkAppraisalBids,
    hasMore: hasMoreTargetBulkAppraisalBids,
    loadMore: loadMoreTargetBulkAppraisalBids,
  } = useFetchTargetBulkAppraisalBids(id);

  return (
    <BulkAppraisalBidContext.Provider
      value={{
        bulkAppraisalBid,
        isLoading,
        error,
        mutate,
        targetBulkAppraisalBids,
        isLoadingTargetBulkAppraisalBids,
        errorTargetBulkAppraisalBids,
        mutateTargetBulkAppraisalBids,
        hasMoreTargetBulkAppraisalBids,
        loadMoreTargetBulkAppraisalBids,
      }}
    >
      {children}
    </BulkAppraisalBidContext.Provider>
  );
};

export const useBulkAppraisalBidContext = () => {
  const context = useContext(BulkAppraisalBidContext);
  if (!context) {
    throw new Error(
      "useBulkAppraisalBid must be used within a BulkAppraisalBidProvider"
    );
  }
  return context;
};
