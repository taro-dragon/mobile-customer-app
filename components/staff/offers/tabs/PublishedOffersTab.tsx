import OffersList from "../OffersList";
import { useOffersContext } from "@/contexts/staff/offers/OffersContext";

const PublishedOffersTab = () => {
  const {
    publishedOffers,
    isPublishedOffersLoading,
    publishedOffersHasMore,
    publishedOffersLoadMore,
    publishedOffersMutate,
  } = useOffersContext();
  return (
    <OffersList
      offers={publishedOffers}
      isLoading={isPublishedOffersLoading}
      hasMore={publishedOffersHasMore}
      loadMore={publishedOffersLoadMore}
      mutate={publishedOffersMutate}
    />
  );
};

export default PublishedOffersTab;
