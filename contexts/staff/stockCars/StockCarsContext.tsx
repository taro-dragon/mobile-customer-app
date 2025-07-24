import useArchivedStockCars from "@/hooks/staff/stockCars/useFetchArchivedStockCars";
import usePublishedStockCars from "@/hooks/staff/stockCars/useFetchPublishedStockCars";
import { Stock } from "@/types/firestore_schema/stock";
import { createContext, useContext } from "react";

type StockCarsContextType = {
  publishedStockCars: Stock[];
  isPublishedStockCarsLoading: boolean;
  publishedStockCarsError?: Error;
  publishedStockCarsLoadMore: () => void;
  publishedStockCarsHasMore: boolean;
  publishedStockCarsMutate: () => void;
  archivedStockCars: Stock[];
  isArchivedStockCarsLoading: boolean;
  archivedStockCarsError?: Error;
  archivedStockCarsLoadMore: () => void;
  archivedStockCarsHasMore: boolean;
  archivedStockCarsMutate: () => void;
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
    error: publishedStockCarsError,
    loadMore: publishedStockCarsLoadMore,
    hasMore: publishedStockCarsHasMore,
    mutate: publishedStockCarsMutate,
  } = usePublishedStockCars();
  const {
    stockCars: archivedStockCars,
    isLoading: isArchivedStockCarsLoading,
    error: archivedStockCarsError,
    loadMore: archivedStockCarsLoadMore,
    hasMore: archivedStockCarsHasMore,
    mutate: archivedStockCarsMutate,
  } = useArchivedStockCars();

  return (
    <StockCarsContext.Provider
      value={{
        publishedStockCars,
        isPublishedStockCarsLoading,
        publishedStockCarsError,
        publishedStockCarsLoadMore,
        publishedStockCarsHasMore,
        publishedStockCarsMutate,
        archivedStockCars,
        isArchivedStockCarsLoading,
        archivedStockCarsError,
        archivedStockCarsLoadMore,
        archivedStockCarsHasMore,
        archivedStockCarsMutate,
      }}
    >
      {children}
    </StockCarsContext.Provider>
  );
};

export const useStockCarsContext = () => {
  const context = useContext(StockCarsContext);
  if (!context) {
    throw new Error(
      "useStockCarsContext must be used within a StockCarsProvider"
    );
  }
  return context;
};
