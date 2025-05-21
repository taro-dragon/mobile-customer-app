import { BulkAppraisalRequestWithCar } from "@/contexts/staff/BulkAppraisalContext";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import useSWR from "swr";

const fetchBulkAppraisalBid = async (id: string) => {
  try {
    const snapshot = await firestore()
      .collection("bulkAppraisalRequests")
      .doc(id)
      .get();
    const data = snapshot.data();
    if (!data) {
      return undefined;
    }
    const carId = data.carId;
    const carSnapshot = await firestore().collection("cars").doc(carId).get();
    const carData = carSnapshot.data();
    if (!carData) {
      return undefined;
    }
    return {
      ...data,
      id: snapshot.id,
      car: carData,
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
    () => fetchBulkAppraisalBid(id)
  );
  return {
    data: data as BulkAppraisalRequestWithCar,
    error,
    mutate,
    isLoading,
  };
};
