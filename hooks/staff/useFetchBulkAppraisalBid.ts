import { BulkAppraisalRequestWithCar } from "@/contexts/staff/BulkAppraisalContext";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import useSWR from "swr";
import { useStore } from "../useStore";
import { Bid } from "@/types/firestore_schema/bids";
import { ExtendedBid } from "../useFetchCarBids";

export type BulkAppraisalBid = BulkAppraisalRequestWithCar & {
  bids?: ExtendedBid[];
};

const fetchBulkAppraisalBid = async (id: string) => {
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
    const bidsSnapShot = await firestore()
      .collection("bids")
      .where("bulkAppraisalRequestId", "==", id)
      .orderBy("minPrice", "desc")
      .get();
    const bids = bidsSnapShot.docs.map((doc) => doc.data()) as Bid[];
    const affiliateStoreSnapshot = bids.map(async (bid) => {
      const affiliateStoreSnapShot = await firestore()
        .collection("shops")
        .doc(bid.affiliateStoreId)
        .get();
      return { ...affiliateStoreSnapShot.data(), id: bid.affiliateStoreId };
    });
    const affiliateStore = await Promise.all(affiliateStoreSnapshot);
    const extendedBids = bids.map((bid, index) => ({
      ...bid,
      affiliateStore: affiliateStore[index],
    }));
    return {
      ...data,
      id: snapshot.id,
      car: carData,
      bids: extendedBids,
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
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bulkAppraisalBid-${id}` : null,
    () => (id ? fetchBulkAppraisalBid(id) : undefined)
  );
  return {
    data: data as BulkAppraisalBid,
    error,
    mutate,
    isLoading,
  };
};
