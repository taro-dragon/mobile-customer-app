import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import { useStore } from "@/hooks/useStore";
import StockCarScreen from "@/screens/users/stockCar";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentStore } = useStore();
  const { stockCar, isLoading } = useFetchStockCar(id);
  const isCurrentStore = useMemo(
    () => currentStore?.id === stockCar?.store.id,
    [currentStore, stockCar]
  );
  if (isLoading || !stockCar) {
    return <ShopDetailSkeleton />;
  }
  return <StockCarScreen stockCar={stockCar} isCurrentStore={isCurrentStore} />;
};

export default StockCar;
