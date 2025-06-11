import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Shop } from "@/types/models/Shop";
import { Stock } from "@/types/firestore_schema/stock";

export type StockCar = Stock & {
  store: Shop;
};

const fetchStockCar = async (id: string) => {
  try {
    const stockCarSnapshot = await firestore()
      .collection("stockCars")
      .doc(id)
      .get();
    const stockCarData = stockCarSnapshot.data();
    if (!stockCarData) {
      throw new Error("車両情報が見つかりません");
    }
    const storeId = stockCarData.storeId;
    const storeSnapshot = await firestore()
      .collection("shops")
      .doc(storeId)
      .get();
    const storeData = storeSnapshot.data();
    if (!storeData) {
      throw new Error("店舗情報が見つかりません");
    }
    storeData.id = storeSnapshot.id;
    return {
      ...stockCarData,
      id: stockCarData.id,
      store: storeData,
    };
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "車両情報の取得に失敗しました",
    });
    router.back();
    return undefined;
  }
};

const useFetchStockCar = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `stockCar-${id}` : null,
    () => fetchStockCar(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    stockCar: data as StockCar | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchStockCar;
