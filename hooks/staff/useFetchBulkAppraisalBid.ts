import { BulkAppraisalRequestWithCar } from "@/contexts/staff/BulkAppraisalContext";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import useSWR from "swr";
import { Bid } from "@/types/firestore_schema/bids";
import { ExtendedBid } from "../useFetchCarBids";

export type BulkAppraisalBid = BulkAppraisalRequestWithCar & {
  bids?: ExtendedBid[];
};

const fetchBulkAppraisalBid = async (id: string) => {
  try {
    const [bulkAppraisalSnapshot, bidsSnapshot] = await Promise.all([
      firestore().collection("bulkAppraisalRequests").doc(id).get(),
      firestore()
        .collection("bids")
        .where("bulkAppraisalRequestId", "==", id)
        .orderBy("minPrice", "desc")
        .get(),
    ]);

    const data = bulkAppraisalSnapshot.data();
    if (!data) {
      throw new Error("査定情報が見つかりません");
    }

    const bids = bidsSnapshot.docs.map((doc) => doc.data()) as Bid[];

    const storeIds = [...new Set(bids.map((bid) => bid.affiliateStoreId))];

    const [carSnapshot, storeSnapshots] = await Promise.all([
      firestore().collection("cars").doc(data.carId).get(),
      Promise.all(
        storeIds.map((storeId) =>
          firestore().collection("shops").doc(storeId).get()
        )
      ),
    ]);

    const carData = carSnapshot.data();
    if (!carData) {
      throw new Error("車両情報が見つかりません");
    }

    const storeMap = new Map(
      storeSnapshots.map((snapshot) => [
        snapshot.id,
        { ...snapshot.data(), id: snapshot.id },
      ])
    );

    const extendedBids = bids.map((bid) => ({
      ...bid,
      affiliateStore: storeMap.get(bid.affiliateStoreId),
    }));

    return {
      ...data,
      id: bulkAppraisalSnapshot.id,
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
    () => (id ? fetchBulkAppraisalBid(id) : undefined),
    {
      revalidateOnFocus: true,
    }
  );
  return {
    data: data as BulkAppraisalBid,
    error,
    mutate,
    isLoading,
  };
};
