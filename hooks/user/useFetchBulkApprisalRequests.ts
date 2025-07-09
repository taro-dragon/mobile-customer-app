import firestore from "@react-native-firebase/firestore";
import useSWR from "swr";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";

const fetchBulkAppraisalRequest = async (id: string) => {
  try {
    const bulkAppraisalRequestSnapshot = await firestore()
      .collection("bulkAppraisalRequests")
      .where("carId", "==", id)
      .get();
    const bulkAppraisalRequestSnapshotData =
      bulkAppraisalRequestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    if (!bulkAppraisalRequestSnapshotData) {
      return undefined;
    }
    return bulkAppraisalRequestSnapshotData[0];
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "エラーが発生しました",
      text2: "一括査定依頼の取得に失敗しました",
    });
    router.back();
    return undefined;
  }
};

const useFetchBulkAppraisalRequest = (id: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `bulkAppraisalRequest-car-${id}` : null,
    () => fetchBulkAppraisalRequest(id),
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateIfStale: true,
      dedupingInterval: 0,
    }
  );
  return {
    bulkAppraisalRequest: data as BulkAppraisalRequest | undefined,
    isLoading,
    isError: !!error,
    mutate,
  };
};

export default useFetchBulkAppraisalRequest;
