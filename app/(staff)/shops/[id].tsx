import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";

import useShop from "@/hooks/useFetchShop";
import { useFetchShopStockCar } from "@/hooks/common/shop/useFetchShopStockCar";

import ShopScreen from "@/screens/staff/shop";

import { useLocalSearchParams } from "expo-router";
import { useFetchShopOffer } from "@/hooks/common/shop/useFetchShopOffer";

const Shop = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { shop, isLoading } = useShop(id);
  const {
    stockCars,
    isLoading: isStockCarLoading,
    hasMore: isStockCarLastPage,
    loadMore: loadMoreStockCar,
  } = useFetchShopStockCar(id);
  const {
    offers,
    isLoading: isOfferLoading,
    hasMore: isOfferLastPage,
    loadMore: loadMoreOffer,
  } = useFetchShopOffer(id);

  if (isLoading || !shop) {
    return <ShopDetailSkeleton />;
  }
  return (
    <ShopScreen
      shop={shop}
      stockCars={stockCars}
      isStockCarLastPage={isStockCarLastPage}
      loadMoreStockCar={loadMoreStockCar}
      offers={offers}
      isOfferLastPage={isOfferLastPage}
      loadMoreOffer={loadMoreOffer}
      isOfferLoading={isOfferLoading}
      isStockCarLoading={isStockCarLoading}
    />
  );
};

export default Shop;
