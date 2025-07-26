import useFetchStockCarDetail from "@/hooks/staff/useFetchStockCarDetail";
import { Stock } from "@/types/firestore_schema/stock";
import { useLocalSearchParams } from "expo-router";
import { createContext, useContext } from "react";

type StockCarContextType = {
  stockCar: Stock;
  isLoading: boolean;
  isError: boolean;
  mutate: () => void;
};

const StockCarContext = createContext<StockCarContextType | undefined>(
  undefined
);

export const StockCarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { stockCar, isLoading, isError, mutate } = useFetchStockCarDetail(id);

  return (
    <StockCarContext.Provider value={{ stockCar, isLoading, isError, mutate }}>
      {children}
    </StockCarContext.Provider>
  );
};

export const useStockCarContext = () => {
  const context = useContext(StockCarContext);
  if (!context) {
    throw new Error(
      "useStockCarContext must be used within a StockCarProvider"
    );
  }
  return context;
};
