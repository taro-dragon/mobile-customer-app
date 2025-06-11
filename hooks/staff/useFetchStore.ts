import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { Shop } from "@/types/models/Shop";
import { Stock } from "@/types/firestore_schema/stock";

export type StockCar = Stock & {
  store: Shop;
};

const fetchStore = async (id: string) => {
  try {
    const storeSnapshot = await firestore().collection("shops").doc(id).get();
    return storeSnapshot.data();
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

const useFetchStore = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `stockCar-${id}` : null,
    () => fetchStore(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    store: data as Shop | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchStore;
