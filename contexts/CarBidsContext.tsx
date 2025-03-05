import React, { createContext, useContext, ReactNode } from "react";
import { Car } from "@/types/models/Car";
import useCarBids, { ExtendedBid } from "@/hooks/useFetchCarBids";
import { useStore } from "@/hooks/useStore";

type CarBidsContextType = {
  bids: ExtendedBid[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => Promise<any>;
};

const CarBidsContext = createContext<CarBidsContextType | undefined>(undefined);

export const useCarBidsContext = () => {
  const context = useContext(CarBidsContext);
  if (context === undefined) {
    throw new Error(
      "useCarOfferContext must be used within a CarOfferProvider"
    );
  }
  return context;
};

type CarBidsProviderProps = {
  children: ReactNode;
  car: Car;
};

export const CarBidsProvider: React.FC<CarBidsProviderProps> = ({
  children,
  car,
}) => {
  const { bulkAppraisalRequests } = useStore();
  const currentBulkAppraisalRequest = bulkAppraisalRequests.find(
    (request) => request.carId === car.id
  );
  const { bids, isLoading, isError, hasMore, loadMore, refresh } = useCarBids(
    currentBulkAppraisalRequest?.id || ""
  );

  const value = {
    bids,
    isLoading,
    isError,
    hasMore,
    loadMore,
    refresh,
  };

  return (
    <CarBidsContext.Provider value={value}>{children}</CarBidsContext.Provider>
  );
};

export default CarBidsContext;
