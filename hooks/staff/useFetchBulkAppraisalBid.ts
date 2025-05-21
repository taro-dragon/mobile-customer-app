import { BulkAppraisalRequestWithCar } from "@/contexts/staff/BulkAppraisalContext";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import useSWR from "swr";
import { useStore } from "../useStore";
import { Bid } from "@/types/firestore_schema/bids";

export type BulkAppraisalBid = BulkAppraisalRequestWithCar & {
  currentStoreBid?: Bid;
};

const fetchBulkAppraisalBid = async (id: string, currentStoreId: string) => {
  try {
    const snapshot = await firestore()
      .collection("bulkAppraisalRequests")
      .doc(id)
      .get();
    const data = snapshot.data();
    if (!data) {
      throw new Error("査定情報が見つかりません");
    }
    const carId = data.carId;
    const carSnapshot = await firestore().collection("cars").doc(carId).get();
    const carData = carSnapshot.data();
    if (!carData) {
      throw new Error("車両情報が見つかりません");
    }
    const currentStoreBidSnapShot = await firestore()
      .collection("bids")
      .where("affiliateStoreId", "==", currentStoreId)
      .where("bulkAppraisalRequestId", "==", id)
      .get();
    const currentStoreBid = currentStoreBidSnapShot.docs.map((doc) =>
      doc.data()
    ) as Bid[];
    return {
      ...data,
      id: snapshot.id,
      car: carData,
      currentStoreBid: currentStoreBid[0],
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

export const useFetchBulkAppraisalBid = (id: string) => {
  const { currentStore } = useStore();
  const currentStoreId = currentStore?.id;
  const { data, error, mutate, isLoading } = useSWR(
    id && currentStoreId ? `bulkAppraisalBid-${id}-${currentStoreId}` : null,
    () =>
      id && currentStoreId
        ? fetchBulkAppraisalBid(id, currentStoreId)
        : undefined
  );
  return {
    data: data as BulkAppraisalBid,
    error,
    mutate,
    isLoading,
  };
};
