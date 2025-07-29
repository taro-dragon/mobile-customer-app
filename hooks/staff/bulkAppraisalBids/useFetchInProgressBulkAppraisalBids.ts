import { useStore } from "@/hooks/useStore";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";
import { ExBulkAppraisalBid } from "./type";
import { Bid } from "@/types/firestore_schema/bids";
import { BulkAppraisalRequest } from "@/types/firestore_schema/bulkAppraisalRequests";
import { Car } from "@/types/models/Car";

const PAGE_SIZE = 20;

const fetchInProgressBulkAppraisalBids = async (
  storeId: string,
  lastDoc?: any
): Promise<{ data: ExBulkAppraisalBid[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("bids")
      .where("status", "==", "in_progress")
      .where("affiliateStoreId", "==", storeId)
      .orderBy("updatedAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const data: ExBulkAppraisalBid[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const bid = doc.data() as Bid;
        const carId = bid.carId;
        const bulkAppraisalRequestId = bid.bulkAppraisalRequestId;
        const bulkAppraisalRequest = await firestore()
          .collection("bulkAppraisalRequests")
          .doc(bulkAppraisalRequestId)
          .get();
        const bulkAppraisalRequestData =
          bulkAppraisalRequest.data() as BulkAppraisalRequest;
        const car = await firestore().collection("cars").doc(carId).get();
        const carData = car.data() as Car;
        return {
          ...bid,
          id: doc.id,
          bulkAppraisalRequests: bulkAppraisalRequestData,
          car: carData,
        } as ExBulkAppraisalBid;
      })
    );
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    const hasMore = snapshot.docs.length === PAGE_SIZE;
    return {
      data,
      lastDoc: lastDocument,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

const useFetchInProgressBulkAppraisalBids = () => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, size, setSize, isValidating, isLoading, mutate } =
    useSWRInfinite(
      (pageIndex: number, previousPageData: any) => {
        if (!storeId) return null;
        const key =
          pageIndex === 0
            ? [`inProgressBulkAppraisalBids-${storeId}`, storeId, null]
            : !previousPageData?.hasMore
            ? null
            : [
                `inProgressBulkAppraisalBids-${storeId}`,
                storeId,
                previousPageData.lastDoc,
              ];
        return key;
      },
      ([_, storeId, lastDoc]: [string, string, any]) =>
        fetchInProgressBulkAppraisalBids(storeId, lastDoc),
      {
        revalidateFirstPage: false,
        revalidateAll: false,
        revalidateOnMount: true,
        revalidateOnFocus: false,
      }
    );

  const bids: ExBulkAppraisalBid[] = data
    ? data.flatMap((page) => page.data)
    : [];
  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;

  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    bids,
    error,
    isLoading,
    isValidating,
    hasMore,
    loadMore,
    mutate,
  };
};

export default useFetchInProgressBulkAppraisalBids;
