import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { Bid } from "@/types/firestore_schema/bids";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import firestore from "@react-native-firebase/firestore";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

export type ExtendedBid = Bid & {
  affiliateStore: AffiliateStore;
};

// 一度に読み込むデータ数
const LIMIT = 10;
const getKey =
  (bulkAppraisalRequestId: string) =>
  (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.buyOffers.length) return null;
    const lastDoc = previousPageData?.lastDoc || null;
    return [bulkAppraisalRequestId, pageIndex, lastDoc];
  };
const fetchCarBids = async ([bulkAppraisalRequestId, pageIndex, lastDoc]: [
  string,
  number,
  any
]) => {
  let query = firestore()
    .collection("bids")
    .where("bulkAppraisalRequestId", "==", bulkAppraisalRequestId)
    .orderBy("price", "desc")
    .limit(10);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const bidsSnapshot = await query.get();

  const bids = (await Promise.all(
    bidsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const affiliateStore = await firestore()
        .collection("shops")
        .doc(data.affiliateStoreId)
        .get();
      const affiliateStoreData = affiliateStore.data() as AffiliateStore;
      return {
        ...data,
        id: doc.id,
        affiliateStore: affiliateStoreData,
      };
    })
  )) as ExtendedBid[];

  return {
    bids,
    lastDoc:
      bidsSnapshot.docs.length > 0
        ? bidsSnapshot.docs[bidsSnapshot.docs.length - 1]
        : null,
  };
};

const useCarBids = (bulkAppraisalRequestId: string) => {
  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(getKey(bulkAppraisalRequestId), fetchCarBids, {
      revalidateFirstPage: true,
      revalidateAll: false,
      persistSize: true,
    });

  const bids = data
    ? data.reduce((acc, page) => [...acc, ...page.bids], [] as ExtendedBid[])
    : [];

  const hasMore = data ? data[data.length - 1].bids.length === LIMIT : false;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isValidating) return;
    setSize(size + 1);
  }, [hasMore, isLoading, isValidating, setSize, size]);

  const refresh = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    bids,
    isLoading,
    isError: !!error,
    hasMore,
    loadMore,
    refresh,
  };
};

export default useCarBids;
