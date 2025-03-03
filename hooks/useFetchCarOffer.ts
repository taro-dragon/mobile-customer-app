import { AffiliateStore } from "@/types/firestore_schema/affiliateStores";
import { BuyOffer } from "@/types/firestore_schema/buyOffers";
import { Car } from "@/types/models/Car";
import firestore from "@react-native-firebase/firestore";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

export type CarBuyOffer = BuyOffer & {
  affiliateStore: AffiliateStore;
};
// 一度に読み込むデータ数
const LIMIT = 20;
const getKey = (carInfo: Car) => (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.buyOffers.length) return null;
  const lastDoc = previousPageData?.lastDoc || null;
  return [carInfo, pageIndex, lastDoc];
};
const fetchCarOffers = async ([carInfo, pageIndex, lastDoc]: [
  Car,
  number,
  any
]) => {
  if (!carInfo) return { buyOffers: [], lastDoc: null };
  let query = firestore()
    .collection("buyOffers")
    .where("model", "==", carInfo.model)
    .where("year", "==", carInfo.year)
    .where("grade", "==", carInfo.grade)
    .where("isActive", "==", true)
    .orderBy("minPrice", "desc")
    .limit(LIMIT);

  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  const buyOffersSnapshot = await query.get();

  const buyOffers = (await Promise.all(
    buyOffersSnapshot.docs.map(async (doc) => {
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
  )) as CarBuyOffer[];

  return {
    buyOffers,
    lastDoc:
      buyOffersSnapshot.docs.length > 0
        ? buyOffersSnapshot.docs[buyOffersSnapshot.docs.length - 1]
        : null,
  };
};

const useCarOffer = (carInfo: Car) => {
  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(getKey(carInfo), fetchCarOffers, {
      revalidateFirstPage: true,
      revalidateAll: false,
      persistSize: true,
    });

  const offers = data
    ? data.reduce(
        (acc, page) => [...acc, ...page.buyOffers],
        [] as CarBuyOffer[]
      )
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

export default useCarOffer;
