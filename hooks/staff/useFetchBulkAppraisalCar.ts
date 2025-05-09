import { Car } from "@/types/models/Car";
import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import { ExtendedBid } from "../useFetchCarBids";
import Toast from "react-native-toast-message";

export type ExtendedBulkAppraisalCar = Car & {
  bids: ExtendedBid[];
};

const fetchBulkAppraisalCar = async (id: string) => {
  try {
    const shopSnapshot = await firestore().collection("cars").doc(id).get();
    const bidsSnapshot = await firestore()
      .collection("bids")
      .where("carId", "==", id)
      .orderBy("minPrice", "desc")
      .get();
    const shopData = shopSnapshot.data();
    if (!shopData) {
      return undefined;
    }
    const bids = bidsSnapshot.docs.map((doc) => doc.data());
    const bidsStoreSnapShots = await Promise.all(
      bids.map(async (bid) => {
        const bidStoreSnapshot = await firestore()
          .collection("shops")
          .doc(bid.affiliateStoreId)
          .get();
        return {
          ...bid,
          affiliateStore: bidStoreSnapshot.data(),
        };
      })
    );

    return {
      ...shopData,
      id: shopSnapshot.id,
      bids: bidsStoreSnapShots,
    };
  } catch (error) {
    console.error(error);
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "車両情報の取得に失敗しました",
    });
    return undefined;
  }
};

const useFetchBulkAppraisalCar = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bulkAppraisalCar-${id}` : null,
    () => fetchBulkAppraisalCar(id),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    bulkAppraisalCar: data as ExtendedBulkAppraisalCar | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchBulkAppraisalCar;
