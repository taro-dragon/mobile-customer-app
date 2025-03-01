import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import firestore from "@react-native-firebase/firestore";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

// 一度に読み込むデータ数
const LIMIT = 10;
const getKey =
  (shopId: string) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.buyOffers.length) return null;
    const lastDoc = previousPageData?.lastDoc || null;
    return [shopId, pageIndex, lastDoc];
  };
const fetchShopOffers = async ([shopId, pageIndex, lastDoc]: [
  string,
  number,
  any
]) => {
  let query = firestore()
    .collection("buyOffers")
    .where("affiliateStoreId", "==", shopId)
    .where("isActive", "==", true)
    .orderBy("createdAt", "desc")
    .limit(10);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const buyOffersSnapshot = await query.get();

  const buyOffers = buyOffersSnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log("data", data);
    return {
      ...data,
      id: doc.id,
    };
  }) as BuyOffer[];

  return {
    buyOffers,
    lastDoc:
      buyOffersSnapshot.docs.length > 0
        ? buyOffersSnapshot.docs[buyOffersSnapshot.docs.length - 1]
        : null,
  };
};

const useShopOffer = (shopId: string) => {
  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(getKey(shopId), fetchShopOffers, {
      revalidateFirstPage: true,
      revalidateAll: false,
      persistSize: true,
    });

  const offers = data
    ? data.reduce((acc, page) => [...acc, ...page.buyOffers], [] as BuyOffer[])
    : [];

  const hasMore = data
    ? data[data.length - 1].buyOffers.length === LIMIT
    : false;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isValidating) return;
    setSize(size + 1);
  }, [hasMore, isLoading, isValidating, setSize, size]);

  const refresh = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    offers,
    isLoading,
    isError: !!error,
    hasMore,
    loadMore,
    refresh,
  };
};

export default useShopOffer;
