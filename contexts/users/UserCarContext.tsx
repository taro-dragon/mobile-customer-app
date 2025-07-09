import useCarBids, { ExtendedBid } from "@/hooks/useFetchCarBids";
import { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import useFetchBulkAppraisalRequest from "@/hooks/user/useFetchBulkApprisalRequests";
import useFetchBuyOffers from "@/hooks/user/useFetchBuyOffers";
import { useStore } from "@/hooks/useStore";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";
import { useLocalSearchParams } from "expo-router";
import { createContext, useContext } from "react";

type UserCarContextType = {
  car: Car;
  bulkAppraisalRequest?: BulkAppraisalRequest;
  bids: ExtendedBid[];
  isBulkAppraisalBidsLoading: boolean;
  hasMoreBulkAppraisalBids: boolean;
  loadMoreBulkAppraisalBids: () => void;
  isBulkAppraisalRequestLoading: boolean;
  buyOffers: CarBuyOffer[];
  isBuyOffersLoading: boolean;
  hasMoreBuyOffers: boolean;
  loadMoreBuyOffers: () => void;
  mutateBulkAppraisalRequest: () => void;
};

const UserCarContext = createContext<UserCarContextType | undefined>(undefined);

export const UserCarProvide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cars } = useStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((car) => car.id === id);
  const {
    bulkAppraisalRequest,
    isLoading: isBulkAppraisalRequestLoading,
    mutate: mutateBulkAppraisalRequest,
  } = useFetchBulkAppraisalRequest(id);
  const {
    buyOffersSnapshotData,
    isLoading: isBuyOffersLoading,
    hasMore: hasMoreBuyOffers,
    loadMore: loadMoreBuyOffers,
  } = useFetchBuyOffers(car as Car);
  const {
    bids,
    isLoading: isBulkAppraisalBidsLoading,
    hasMore: hasMoreBulkAppraisalBids,
    loadMore: loadMoreBulkAppraisalBids,
  } = useCarBids(bulkAppraisalRequest?.id ?? "");

  return (
    <UserCarContext.Provider
      value={{
        car: car as Car,
        bulkAppraisalRequest,
        bids,
        isBulkAppraisalBidsLoading,
        hasMoreBulkAppraisalBids,
        loadMoreBulkAppraisalBids,
        isBulkAppraisalRequestLoading,
        buyOffers: buyOffersSnapshotData,
        isBuyOffersLoading,
        hasMoreBuyOffers,
        loadMoreBuyOffers,
        mutateBulkAppraisalRequest,
      }}
    >
      {children}
    </UserCarContext.Provider>
  );
};

export const useUserCarContext = () => {
  const context = useContext(UserCarContext);
  if (!context) {
    throw new Error("useUserCarContext must be used within a UserCarProvide");
  }
  return context;
};
