import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { Bid } from "@/types/firestore_schema/bids";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

export type TargetBulkAppraisalBid = Bid & {
  affiliateStore?: AffiliateStore;
};

const fetchTargetBulkAppraisalBids = async (
  id: string,
  pageIndex: number = 0,
  pageSize: number = 10
) => {
  try {
    const bulkAppraisalBid = await firestore().collection("bids").doc(id).get();

    const bulkAppraisalBidData = bulkAppraisalBid.data();
    if (!bulkAppraisalBidData) {
      throw new Error("Bulk appraisal bid not found");
    }
    const targetBulkAppraisalRequestId =
      bulkAppraisalBidData.bulkAppraisalRequestId;

    let query = firestore()
      .collection("bids")
      .where("bulkAppraisalRequestId", "==", targetBulkAppraisalRequestId)
      .orderBy("minPrice", "desc");

    // ページネーション対応
    if (pageIndex > 0) {
      // 前のページの最後のドキュメントを取得してカーソルとして使用
      const lastDoc = await firestore()
        .collection("bids")
        .where("bulkAppraisalRequestId", "==", targetBulkAppraisalRequestId)
        .orderBy("minPrice", "desc")
        .limit(pageIndex * pageSize)
        .get();

      if (!lastDoc.empty) {
        const lastVisible = lastDoc.docs[lastDoc.docs.length - 1];
        query = query.startAfter(lastVisible);
      }
    }

    const TargetBulkAppraisalRequestBids = await query.limit(pageSize).get();

    const targetBulkAppraisalRequestBids = await Promise.all(
      TargetBulkAppraisalRequestBids.docs.map(async (doc) => {
        const bidData = doc.data();
        const affiliateStore = await firestore()
          .collection("shops")
          .doc(bidData.affiliateStoreId)
          .get();
        const affiliateStoreData = affiliateStore.data() as AffiliateStore;
        return { ...bidData, affiliateStore: affiliateStoreData };
      })
    );
    return {
      bids: targetBulkAppraisalRequestBids as TargetBulkAppraisalBid[],
      hasMore: TargetBulkAppraisalRequestBids.docs.length === pageSize,
    };
  } catch (error) {
    throw error;
  }
};

export const useFetchTargetBulkAppraisalBids = (id: string) => {
  const getKey = (
    pageIndex: number,
    previousPageData: TargetBulkAppraisalBid[]
  ) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return [`targetBulkAppraisalBids`, id, pageIndex.toString()];
  };

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite(
      getKey,
      async ([_, bidId, pageIndexStr]) => {
        const pageIndex = parseInt(pageIndexStr as string, 10);
        return await fetchTargetBulkAppraisalBids(bidId, pageIndex);
      },
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  const bids: TargetBulkAppraisalBid[] = data
    ? data.flatMap((page) => page.bids)
    : [];

  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;
  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    bids: bids as TargetBulkAppraisalBid[],
    error,
    isLoading,
    isValidating,
    hasMore,
    loadMore,
    mutate,
  };
};
