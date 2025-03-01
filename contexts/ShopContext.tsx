import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  // 店舗データの取得
  const { shop, isLoading, isError } = useShop(shopId);

  // 店舗のオファーデータを取得
  const {
    offers,
    isLoading: offersLoading,
    isError: offersError,
    hasMore,
    loadMore,
    refresh,
  } = useFetchShopOffer(shopId);

  // さらにオファーを読み込む関数
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
