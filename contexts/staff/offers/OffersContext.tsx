import useArchivedOffers from "@/hooks/staff/offers/useFetchArchivedOffers";
import usePublishedOffers from "@/hooks/staff/offers/useFetchPublishedOffers";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { createContext, useContext } from "react";

type OffersContextType = {
  publishedOffers: BuyOffer[];
  isPublishedOffersLoading: boolean;
  publishedOffersError?: Error;
  publishedOffersLoadMore: () => void;
  publishedOffersHasMore: boolean;
  publishedOffersMutate: () => void;
  archivedOffers: BuyOffer[];
  isArchivedOffersLoading: boolean;
  archivedOffersError?: Error;
  archivedOffersLoadMore: () => void;
  archivedOffersHasMore: boolean;
  archivedOffersMutate: () => void;
};

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    offers: publishedOffers,
    isLoading: isPublishedOffersLoading,
    error: publishedOffersError,
    loadMore: publishedOffersLoadMore,
    hasMore: publishedOffersHasMore,
    mutate: publishedOffersMutate,
  } = usePublishedOffers();
  const {
    offers: archivedOffers,
    isLoading: isArchivedOffersLoading,
    error: archivedOffersError,
    loadMore: archivedOffersLoadMore,
    hasMore: archivedOffersHasMore,
    mutate: archivedOffersMutate,
  } = useArchivedOffers();

  return (
    <OffersContext.Provider
      value={{
        publishedOffers,
        isPublishedOffersLoading,
        publishedOffersError,
        publishedOffersLoadMore,
        publishedOffersHasMore,
        publishedOffersMutate,
        archivedOffers,
        isArchivedOffersLoading,
        archivedOffersError,
        archivedOffersLoadMore,
        archivedOffersHasMore,
        archivedOffersMutate,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffersContext = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffersContext must be used within a OffersProvider");
  }
  return context;
};
