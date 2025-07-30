import { useOffersContext } from "@/contexts/staff/offers/OffersContext";
import OffersList from "../OffersList";

const ArchivedOffersTab = () => {
  const {
    archivedOffers,
    isArchivedOffersLoading,
    archivedOffersHasMore,
    archivedOffersLoadMore,
    archivedOffersMutate,
  } = useOffersContext();
  return (
    <OffersList
      offers={archivedOffers}
      isLoading={isArchivedOffersLoading}
      hasMore={archivedOffersHasMore}
      loadMore={archivedOffersLoadMore}
      mutate={archivedOffersMutate}
    />
  );
};

export default ArchivedOffersTab;
