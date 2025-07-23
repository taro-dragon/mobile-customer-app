import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Stock } from "@/types/firestore_schema/stock";
import firestore from "@react-native-firebase/firestore";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20;

const fetchShopOffer = async (
  shopId: string,
  lastDoc?: any
): Promise<{ data: BuyOffer[]; lastDoc: any; hasMore: boolean }> => {
  try {
    let query = firestore()
      .collection("buyOffers")
      .where("affiliateStoreId", "==", shopId)
      .orderBy("createdAt", "desc")
      .limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const offerSnapshot = await query.get();

    const data: BuyOffer[] = offerSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BuyOffer[];

    const lastDocument = offerSnapshot.docs[offerSnapshot.docs.length - 1];
    const hasMore = offerSnapshot.docs.length === PAGE_SIZE;

    return {
      data,
      lastDoc: lastDocument,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

export const useFetchShopOffer = (shopId: string) => {
  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        const key =
          pageIndex === 0
            ? [`buyOffers-${shopId}`, shopId, null]
            : !previousPageData?.hasMore
            ? null
            : [`buyOffers-${shopId}`, shopId, previousPageData.lastDoc];

        return key;
      },
      ([_, shopId, lastDoc]) => {
        return fetchShopOffer(shopId, lastDoc);
      },
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
  };
};
