import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import { useStore } from "@/hooks/useStore";
import StockCarScreen from "@/screens/users/stockCar";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { stockCar, isLoading } = useFetchStockCar(id);
  if (isLoading || !stockCar) {
    return <ShopDetailSkeleton />;
  }
  const onInquire = async () => {};
  return <StockCarScreen stockCar={stockCar} isInquiry={false} />;
};

export default StockCar;
