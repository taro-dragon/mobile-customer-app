import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import { useStore } from "@/hooks/useStore";
import StockCarScreen from "@/screens/staff/stockCar";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentStore } = useStore();
  const isCurrentStore = useMemo(
    () => currentStore?.id === id,
    [currentStore, id]
  );
  const { stockCar, isLoading } = useFetchStockCar(id);
  if (isLoading || !stockCar) {
    return <ShopDetailSkeleton />;
  }
  return <StockCarScreen stockCar={stockCar} isCurrentStore={isCurrentStore} />;
};

export default StockCar;
