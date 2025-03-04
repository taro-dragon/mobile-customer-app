import React, { createContext, useContext, ReactNode } from "react";
import useCarOffer, { CarBuyOffer } from "@/hooks/useFetchCarOffer";
import { Car } from "@/types/models/Car";

type CarOfferContextType = {
  offers: CarBuyOffer[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => Promise<any>;
};

const CarOfferContext = createContext<CarOfferContextType | undefined>(
  undefined
);

export const useCarOfferContext = () => {
  const context = useContext(CarOfferContext);
  if (context === undefined) {
    throw new Error(
      "useCarOfferContext must be used within a CarOfferProvider"
    );
  }
  return context;
};

type CarOfferProviderProps = {
  children: ReactNode;
  car: Car;
};

export const CarOfferProvider: React.FC<CarOfferProviderProps> = ({
  children,
  car,
}) => {
  const { offers, isLoading, isError, hasMore, loadMore, refresh } =
    useCarOffer(car);

  const value = {
    offers,
    isLoading,
    isError,
    hasMore,
    loadMore,
    refresh,
  };

  return (
    <CarOfferContext.Provider value={value}>
      {children}
    </CarOfferContext.Provider>
  );
};

export default CarOfferContext;
