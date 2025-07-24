import StockCarsList from "@/components/staff/StockCars/StockCarsList/StockCarsList";
import { useStockCarsContext } from "@/contexts/staff/stockCars/StockCarsContext";

const ArchivedStockCarTab = () => {
  const {
    archivedStockCars,
    archivedStockCarsLoadMore,
    archivedStockCarsHasMore,
    isArchivedStockCarsLoading,
    archivedStockCarsMutate,
  } = useStockCarsContext();

  return (
    <StockCarsList
      stockCars={archivedStockCars}
      isLoading={isArchivedStockCarsLoading}
      hasMore={archivedStockCarsHasMore}
      loadMore={archivedStockCarsLoadMore}
      mutate={archivedStockCarsMutate}
    />
  );
};

export default ArchivedStockCarTab;
