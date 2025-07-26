import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Stock } from "@/types/firestore_schema/stock";

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
    return {
      ...stockCarData,
      id: stockCarSnapshot.id,
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

const useFetchStockCarDetail = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `stockCarDetail-${id}` : null,
    () => fetchStockCar(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    stockCar: data as Stock,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchStockCarDetail;
