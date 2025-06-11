import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import useFetchStore from "@/hooks/staff/useFetchStore";
import { useStore } from "@/hooks/useStore";
import StockCarScreen from "@/screens/staff/stockCar";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { store, isLoading } = useFetchStore(id);

  if (isLoading || !store) {
    return <ShopDetailSkeleton />;
  }
  return (
    <View>
      <Text>{store.shopName}</Text>
    </View>
  );
};

export default StockCar;
