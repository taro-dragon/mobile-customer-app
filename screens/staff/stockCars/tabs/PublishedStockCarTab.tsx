import { useStockCarsContext } from "@/contexts/staff/stockCars/StockCarsContext";
import StockCarsList from "@/components/staff/StockCars/StockCarsList/StockCarsList";

const PublishedStockCarTab = () => {
  const {
    publishedStockCars,
    publishedStockCarsLoadMore,
    publishedStockCarsHasMore,
    isPublishedStockCarsLoading,
    publishedStockCarsMutate,
  } = useStockCarsContext();
  return (
    <StockCarsList
      stockCars={publishedStockCars}
      isLoading={isPublishedStockCarsLoading}
      hasMore={publishedStockCarsHasMore}
      loadMore={publishedStockCarsLoadMore}
      mutate={publishedStockCarsMutate}
    />
  );
};

export default PublishedStockCarTab;
