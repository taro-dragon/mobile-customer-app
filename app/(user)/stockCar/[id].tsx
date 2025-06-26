import ShopDetailSkeleton from "@/components/Skelton/SkeltonShopInfo";
import useFetchStockCar from "@/hooks/staff/useFetchStockCar";
import functions from "@react-native-firebase/functions";

import StockCarScreen from "@/screens/users/stockCar";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useStore } from "@/hooks/useStore";

const StockCar = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { stockCar, isLoading } = useFetchStockCar(id);
  const { userTalks } = useStore();
  const [isInquiring, setIsInquiring] = useState(false);
  const isInquiry = userTalks.some((talk) => talk.sourceId === id);
  if (isLoading || !stockCar) {
    return <ShopDetailSkeleton />;
  }
  const onInquire = async () => {
    const userInquire = functions().httpsCallable("userInquire");
    setIsInquiring(true);
    try {
      await userInquire({
        targetStockCarId: id,
      });
      Toast.show({
        type: "success",
        text1: "問い合わせを送信しました",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "問い合わせに失敗しました",
      });
    } finally {
      setIsInquiring(false);
    }
  };
  return (
    <StockCarScreen
      stockCar={stockCar}
      isInquiry={isInquiry}
      onInquire={onInquire}
      isInquiring={isInquiring}
    />
  );
};

export default StockCar;
