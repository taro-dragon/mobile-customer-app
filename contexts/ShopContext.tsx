import React, { createContext, useContext, ReactNode } from "react";
import useShop, { ShopWithManagementCompany } from "@/hooks/useFetchShop";
import useFetchShopOffer from "@/hooks/useFetchShopOffer";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";

type ShopContextType = {
  shop: ShopWithManagementCompany | undefined;
  isLoading: boolean;
  isError: boolean;
  offers: BuyOffer[];
  offersLoading: boolean;
  hasMoreOffers: boolean;
  loadMoreOffers: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};

type ShopProviderProps = {
  children: ReactNode;
  shopId: string;
};

export const ShopProvider: React.FC<ShopProviderProps> = ({
  children,
  shopId,
}) => {
  const { shop, isLoading, isError } = useShop(shopId);

  const {
    offers,
    isLoading: offersLoading,
    isError: offersError,
    hasMore,
    loadMore,
  } = useFetchShopOffer(shopId);

  const loadMoreOffers = () => {
    if (hasMore) {
      loadMore();
    }
  };

  const value = {
    shop,
    isLoading,
    isError,
    offers,
    offersLoading,
    hasMoreOffers: hasMore,
    loadMoreOffers,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
