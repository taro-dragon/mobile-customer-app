import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import StockCarScreen from "@/screens/staff/stockCar";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { stockCar, isLoading } = useFetchStockCar(id);
  if (isLoading || !stockCar) {
    return <ShopDetailSkeleton />;
  }
  return <StockCarScreen stockCar={stockCar} />;
};

export default StockCar;
