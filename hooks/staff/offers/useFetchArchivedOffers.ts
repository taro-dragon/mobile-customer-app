import { useStore } from "@/hooks/useStore";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Stock } from "@/types/firestore_schema/stock";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const fetchArchivedOffers = async (
  storeId: string,
  lastDoc?: any
): Promise<{ data: BuyOffer[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("buyOffers")
      .where("status", "==", "archived")
      .where("affiliateStoreId", "==", storeId)
      .orderBy("updatedAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const data: BuyOffer[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as BuyOffer;
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

const useArchivedOffers = () => {
  const { currentStore } = useStore();
  const storeId = currentStore?.id;
  const { data, error, size, setSize, isValidating, isLoading, mutate } =
    useSWRInfinite(
      (pageIndex: number, previousPageData: any) => {
        if (!storeId) return null;
        const key =
          pageIndex === 0
            ? [`archivedOffers-${storeId}`, storeId, null]
            : !previousPageData?.hasMore
            ? null
            : [`archivedOffers-${storeId}`, storeId, previousPageData.lastDoc];
        return key;
      },
      ([_, storeId, lastDoc]: [string, string, any]) =>
        fetchArchivedOffers(storeId, lastDoc),
      {
        revalidateFirstPage: false,
        revalidateAll: false,
        revalidateOnMount: true,
        revalidateOnFocus: false,
      }
    );

  const offers: BuyOffer[] = data ? data.flatMap((page) => page.data) : [];
  const hasMore =
    data && data.length > 0 ? data[data.length - 1]?.hasMore : false;

  const loadMore = () => {
    if (hasMore && !isValidating) {
      setSize(size + 1);
    }
  };

  return {
    offers,
    error,
    isLoading,
    isValidating,
    hasMore,
    loadMore,
    mutate,
  };
};

export default useArchivedOffers;
