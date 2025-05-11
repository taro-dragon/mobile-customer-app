import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { Bid } from "@/types/firestore_schema/bids";
import { router } from "expo-router";

const fetchBid = async (id: string) => {
  try {
    const bidSnapshot = await firestore().collection("bids").doc(id).get();
    const bidData = bidSnapshot.data();
    if (!bidData) {
      return undefined;
    }
    return {
      ...bidData,
      id: bidSnapshot.id,
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

const useFetchBid = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bid-${id}` : null,
    () => fetchBid(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    bid: data as Bid | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchBid;
