import usePublishedStockCars from "@/hooks/staff/stockCars/useFetchPublishedStockCars";
import { Stock } from "@/types/firestore_schema/stock";
import { createContext, useContext } from "react";

type StockCarsContextType = {
  publishedStockCars: Stock[];
  isPublishedStockCarsLoading: boolean;
  isPublishedStockCarsError: Error | null;
  publishedStockCarsLoadMore: () => void;
  publishedStockCarsHasMore: boolean;
  publishedStockCarsMutate: () => void;
};

const StockCarsContext = createContext<StockCarsContextType | undefined>(
  undefined
);

export const StockCarsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    stockCars: publishedStockCars,
    isLoading: isPublishedStockCarsLoading,
    error: isPublishedStockCarsError,
    loadMore: publishedStockCarsLoadMore,
    hasMore: publishedStockCarsHasMore,
    mutate: publishedStockCarsMutate,
  } = usePublishedStockCars();
  return (
    <StockCarsContext.Provider
      value={{
        publishedStockCars,
        isPublishedStockCarsLoading,
        isPublishedStockCarsError,
        publishedStockCarsLoadMore,
        publishedStockCarsHasMore,
        publishedStockCarsMutate,
      }}
    >
      {children}
    </StockCarsContext.Provider>
  );
};

export const useStockCarsContext = () => {
  return useContext(StockCarsContext);
};
