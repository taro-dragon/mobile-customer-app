import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";

import useShop from "@/hooks/useFetchShop";
import { useFetchShopStockCar } from "@/hooks/useFetchShopStockCar";

import ShopScreen from "@/screens/staff/shop";

import { useLocalSearchParams } from "expo-router";

const Shop = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { shop, isLoading } = useShop(id);
  const {
    stockCars,
    isLoading: isStockCarLoading,
    hasMore: isStockCarLastPage,
    loadMore: loadMoreStockCar,
  } = useFetchShopStockCar(id);

  if (isLoading || !shop) {
    return <ShopDetailSkeleton />;
  }
  return (
    <ShopScreen
      shop={shop}
      stockCars={stockCars}
      isStockCarLastPage={isStockCarLastPage}
      loadMoreStockCar={loadMoreStockCar}
    />
  );
};

export default Shop;
